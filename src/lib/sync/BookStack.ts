import { db } from "../db";
import { BookStack } from "../external/BookStack";
import { Logto } from "../external/Logto";

const hasBook = async (bookId: number) => {
  const count = await db.BookStack_Books.where("id", bookId).first();
  return count !== undefined;
}

const hasPage = async (pageId: number) => {
  const count = await db.BookStack_Pages.where("id", pageId).first();
  return count !== undefined;
}

const htmlFilter = (html: string) => html.replace(/<[^>]*>/g, ""); // remove all html tags
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const sync = async () => {
  const books = await (await BookStack.booksList()).data

  for (const book of books) {
    console.log(`[${new Date().toISOString()}][BookStack] Syncing book ${book.name}(${book.id}) ...`)

    try {
      if (await hasBook(book.id)) {
        await db.BookStack_Books.where("id", book.id).update({
          name: book.name,
          slug: book.slug,
          description: book.description.substring(0, 200),
          created_at: new Date(book.created_at),
          updated_at: new Date(book.updated_at),
          owned_by: book.owned_by,
          created_by: book.created_by,
          updated_by: book.updated_by,
          cover_url: book.cover?.url!,
        })
      } else {
        await db.BookStack_Books.insert({
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
        })
      }
    } catch (e) {
      console.error(`[${new Date().toISOString()}][BookStack] Failed to sync book ${book.name}(${book.id})`, e)
    }
  }

  const pages = await (await BookStack.pageList()).data.sort(() => Math.random() - 0.5); // randomize the order of pages

  for (const page of pages) {
    console.log(`[${new Date().toISOString()}][BookStack] Syncing page ${page.name}(${page.id}) ...`)

    try {
      await sleep(1000)

      const pageItem = await BookStack.pageRead(page.id)
      const content = htmlFilter(pageItem.raw_html)

      if (await hasPage(page.id)) {
        await db.BookStack_Pages.where("id", page.id).update({
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
        })
      } else {
        await db.BookStack_Pages.insert({
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
        })
      }
    } catch (e) {
      console.error(`[${new Date().toISOString()}][BookStack] Failed to sync page ${page.name}(${page.id})`, e)
    }
  }

  const users = await (await BookStack.userList()).data

  for (const user of users) {
    console.log(`[${new Date().toISOString()}][BookStack] Syncing user ${user.name}(${user.id}) ...`)

    try {
      const logtoUser = await Logto.getUser(user.external_auth_id);

      if (logtoUser) {
        const hasUser = await db.User.where("logto_id", logtoUser.id).first();

        if (!hasUser) {
          await db.User.insert({
            logto_id: logtoUser.id,
            name: user.name || logtoUser.username,
            avatar: logtoUser.avatar,
            custom_data: JSON.stringify(logtoUser.customData)
          })
        } else {
          await db.User.where("logto_id", logtoUser.id).update({
            name: user.name || logtoUser.username,
            avatar: logtoUser.avatar,
            custom_data: JSON.stringify(logtoUser.customData)
          })
        }

        const hasLink = await db.UserLink.where("logto_id", logtoUser.id).where("platform", "bookstack").first();

        if (!hasLink) {
          await db.UserLink.insert({
            logto_id: logtoUser.id,
            platform: "bookstack",
            platform_id: user.id.toString(),
          })
        } else {
          await db.UserLink.where("logto_id", logtoUser.id).where("platform", "bookstack").update({
            platform_id: user.id.toString(),
          })
        }
      }
    } catch (e) {
      console.error(`[${new Date().toISOString()}][BookStack] Failed to sync user ${user.name}(${user.id})`, e)
    }
  }

  console.log(`[${new Date().toISOString()}][BookStack] Sync complete`)
}

export default sync;
