import {BookStack} from "../external/BookStack";
import {Logto} from "../external/Logto";
import prisma from "../db";
import {appendContributions} from "@/lib/sync/contributions";

const hasBook = async (bookId: number) => {
  const count = await prisma.bookstack_books.findFirst({where: {id: bookId}});
  return !!count;
}

const hasPage = async (pageId: number) => {
  const count = await prisma.bookstack_pages.findFirst({where: {id: pageId}});
  return !!count;
}

const htmlFilter = (html: string) => html.replace(/<[^>]*>/g, ""); // remove all html tags
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const sync = async () => {
  const users = await (await BookStack.userList()).data

  for (const user of users) {
    console.log(`[${new Date().toISOString()}][BookStack] Syncing user ${user.name}(${user.id}) ...`)

    try {
      const logtoUser = await Logto.getUser(user.external_auth_id);

      if (logtoUser) {
        const hasLink = await prisma.user_link.findUnique({where: {logto_id: user.external_auth_id, platform: "bookstack"}});

        if (!hasLink) {
          await prisma.user_link.create({
            data: {
              logto_id: user.external_auth_id,
              platform: "bookstack",
              platform_id: user.id.toString(),
            }
          })
        } else {
          await prisma.user_link.update({
            where: {logto_id: user.external_auth_id, platform: "bookstack"},
            data: {
              platform_id: user.id.toString(),
            }
          })
        }
      }
    } catch (e) {
      console.error(`[${new Date().toISOString()}][BookStack] Failed to sync user ${user.name}(${user.id})`, e)
    }
  }

  const books = (await BookStack.booksList()).data

  for (const book of books) {
    console.log(`[${new Date().toISOString()}][BookStack] Syncing book ${book.name}(${book.id}) ...`)

    try {
      if (await hasBook(book.id)) {
        await prisma.bookstack_books.update({
          where: {id: book.id},
          data: {
            name: book.name,
            slug: book.slug,
            description: book.description.substring(0, 200),
            created_at: new Date(book.created_at),
            updated_at: new Date(book.updated_at),
            owned_by: book.owned_by,
            created_by: book.created_by,
            updated_by: book.updated_by,
            cover_url: book.cover?.url!,
          }
        })

        const logto_id = users.find(u => u.id === book.updated_by)?.external_auth_id!

        if (!logto_id) {
          console.log(`[${new Date().toISOString()}][BookStack] WARN: User ${book.updated_by} logto_id is missing`)
        } else {
          await appendContributions({
            logto_id: users.find(u => u.id === book.owned_by)?.external_auth_id!,
            date: new Date(book.updated_at),
            type: "edit",
            resourceId: book.id.toString(),
            source: "bookstack:book",
            message: book.name,
            url: `https://docs.vrcd.org.cn/books/${book.slug}`
          })
        }
      } else {
        await prisma.bookstack_books.create({
          data: {
            id: book.id,
            name: book.name,
            slug: book.slug,
            description: book.description,
            created_at: new Date(book.created_at),
            updated_at: new Date(),
            owned_by: book.owned_by,
            created_by: book.created_by,
            updated_by: book.updated_by,
            cover_url: book.cover?.url!,
          }
        })

        const logto_id = users.find(u => u.id === book.owned_by)?.external_auth_id!

        if (!logto_id) {
          console.log(`[${new Date().toISOString()}][BookStack] WARN: User ${book.owned_by} logto_id is missing`)
        } else {
          await appendContributions({
            logto_id: users.find(u => u.id === book.owned_by)?.external_auth_id!,
            date: new Date(book.updated_at),
            type: "create",
            resourceId: book.id.toString(),
            source: "bookstack:book",
            message: book.name,
            url: `https://docs.vrcd.org.cn/books/${book.slug}`
          })
        }
      }
    } catch (e) {
      console.error(`[${new Date().toISOString()}][BookStack] Failed to sync book ${book.name}(${book.id})`, e)
    }
  }

  const pages = (await BookStack.pageList()).data.sort(() => Math.random() - 0.5); // randomize the order of pages

  for (const page of pages) {
    console.log(`[${new Date().toISOString()}][BookStack] Syncing page ${page.name}(${page.id}) ...`)
    try {
      await sleep(1000)

      if (await hasPage(page.id)) {
        const logto_id = users.find(u => u.id === page.updated_by)?.external_auth_id!

        if (!logto_id) {
          console.log(`[${new Date().toISOString()}][BookStack] WARN: User ${page.updated_by} logto_id is missing`)
        } else {
          const isDupe = await appendContributions({
            logto_id: users.find(u => u.id === page.updated_by)?.external_auth_id!,
            date: new Date(page.updated_at),
            type: "edit",
            resourceId: page.id.toString(),
            source: "bookstack:page",
            message: page.name,
            url: `https://docs.vrcd.org.cn/books/${page.book_slug}/page/${page.slug}`
          })

          if (isDupe) {
            console.log(`[${new Date().toISOString()}][BookStack] Dupe page ${page.name}(${page.id}), skiping`)
            continue
          }
        }

        const pageItem = await BookStack.pageRead(page.id)
        const content = htmlFilter(pageItem.raw_html)

        await prisma.bookstack_pages.update({
          where: {id: page.id},
          data: {
            name: page.name,
            slug: page.slug,
            book_id: page.book_id,
            chapter_id: page.chapter_id,
            draft: page.draft,
            template: page.template,
            created_at: new Date(page.created_at),
            updated_at: new Date(page.updated_at),
            priority: page.priority,
            owned_by: page.owned_by,
            book_slug: page.book_slug,
            created_by: page.created_by,
            updated_by: page.updated_by,
            revision_count: page.revision_count,
            editor: page.editor,
            chars: content.length,
          }
        })
      } else {
        const pageItem = await BookStack.pageRead(page.id)
        const content = htmlFilter(pageItem.raw_html)

        await prisma.bookstack_pages.create({
          data: {
            id: page.id,
            name: page.name,
            slug: page.slug,
            book_id: page.book_id,
            chapter_id: page.chapter_id,
            draft: page.draft,
            template: page.template,
            created_at: new Date(page.created_at),
            updated_at: new Date(),
            priority: page.priority,
            owned_by: page.owned_by,
            book_slug: page.book_slug,
            created_by: page.created_by,
            updated_by: page.updated_by,
            revision_count: page.revision_count,
            editor: page.editor,
            chars: content.length,
          }
        })

        const logto_id = users.find(u => u.id === page.owned_by)?.external_auth_id!

        if (!logto_id) {
          console.log(`[${new Date().toISOString()}][BookStack] WARN: User ${page.owned_by} logto_id is missing`)
        } else {
          await appendContributions({
            logto_id: users.find(u => u.id === page.owned_by)?.external_auth_id!,
            date: new Date(page.updated_at),
            type: "create",
            resourceId: page.id.toString(),
            source: "bookstack:page",
            message: page.name,
            url: `https://docs.vrcd.org.cn/books/${page.book_slug}/page/${page.slug}`
          })
        }
      }
    } catch (e) {
      console.error(`[${new Date().toISOString()}][BookStack] Failed to sync page ${page.name}(${page.id})`, e)
    }
  }

  console.log(`[${new Date().toISOString()}][BookStack] Sync complete`)
}

export default sync;
