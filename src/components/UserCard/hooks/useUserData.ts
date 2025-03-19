'use server';

import { db } from "@/lib/db";

export interface UserData {
  LogtoUser: any;
  BookStackUser: any;
  BookStackBooks: any[];
  BookStackPages: any[];
  editedBooks: any[];
  totalChars: number;
  errors: {
    logtoUserError: any;
    bookStackUserError: any;
    bookStackBooksError: any;
    bookStackPagesError: any;
    editedBooksError: any;
  };
}

export async function useUserData(id: string): Promise<UserData> {
  let LogtoUser, BookStackUser, BookStackBooks, BookStackPages, editedBooks, totalChars;
  let logtoUserError: any = null;
  let bookStackUserError: any = null;
  let bookStackBooksError: any = null;
  let bookStackPagesError: any = null;
  let editedBooksError: any = null;

  try {
    LogtoUser = await db.User.where("logto_id", id).first();
    if (!LogtoUser) {
      throw new Error("User not found");
    }

    LogtoUser.custom_data = JSON.parse(LogtoUser.custom_data || "{}");
  } catch (error) {
    console.error("Failed to fetch user from database:", error);
    logtoUserError = error;
  }

  try {
    const userLink = await db.UserLink.where("logto_id", id).where("platform", "bookstack").first();
    if (!userLink) {
      throw new Error("BookStack user link not found");
    }
    BookStackUser = { id: parseInt(userLink.platform_id) };
  } catch (error) {
    console.error("Failed to fetch BookStack user link from database:", error);
    bookStackUserError = error;
  }

  try {
    if (BookStackUser) {
      BookStackBooks = await db.BookStack_Books.where("owned_by", BookStackUser.id);
    }
  } catch (error) {
    console.error("Failed to fetch books from database:", error);
    bookStackBooksError = error;
  }

  try {
    if (BookStackUser) {
      BookStackPages = await db.BookStack_Pages.where("created_by", BookStackUser.id);
      totalChars = BookStackPages.reduce((acc, page) => acc + page.chars, 0);
    }
  } catch (error) {
    console.error("Failed to fetch pages from database:", error);
    bookStackPagesError = error;
  }

  try {
    const bookIds = Array.from(new Set(BookStackPages?.map(page => page.book_id) || []));
    editedBooks = await Promise.all(bookIds.map(async (bookId) => {
      const book = await db.BookStack_Books.where("id", bookId).first();
      return book;
    }));
  } catch (error) {
    console.error("Failed to fetch edited books from database:", error);
    editedBooksError = error;
  }

  return {
    LogtoUser,
    BookStackUser,
    BookStackBooks: BookStackBooks || [],
    BookStackPages: BookStackPages || [],
    editedBooks: editedBooks || [],
    totalChars: totalChars || 0,
    errors: {
      logtoUserError,
      bookStackUserError,
      bookStackBooksError,
      bookStackPagesError,
      editedBooksError
    }
  };
}