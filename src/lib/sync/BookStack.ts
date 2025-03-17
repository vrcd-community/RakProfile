import { db } from "../db";
import { BookStack } from "../external/BookStack";
import { Logto } from "../external/Logto";

const hasBook = async (bookId: number) => {
  const count = await db.BookStack_Books.where("id", bookId).first();
  return count !== undefined;
}

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
          })
        } else {
          await db.User.where("logto_id", logtoUser.id).update({
            name: user.name || logtoUser.username,
            avatar: logtoUser.avatar,
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

sync();
