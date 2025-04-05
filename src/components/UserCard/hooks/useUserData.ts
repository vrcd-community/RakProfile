'use server';
import prisma from "@/lib/db";

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
    LogtoUser = await prisma.user.findUnique({ where: { logto_id: id } });
    if (!LogtoUser) {
      throw new Error("User not found");
    }

    LogtoUser.custom_data = JSON.parse(LogtoUser.custom_data || "{}");
  } catch (error) {
    console.error("Failed to fetch user from database:", error);
    logtoUserError = error;
  }

  try {
    const userLink = await prisma.user_link.findFirst({ where: { logto_id: id, platform: "bookstack" } });
    if (!userLink) {
      throw new Error("BookStack user link not found");
    }
    BookStackUser = { id: parseInt(userLink.platform_id as string) };
  } catch (error) {
    console.error("Failed to fetch BookStack user link from database:", error);
    bookStackUserError = error;
  }

  try {
    if (BookStackUser) {
      BookStackBooks = await prisma.bookstack_books.findMany({ where: { owned_by: BookStackUser.id } });
    }
  } catch (error) {
    console.error("Failed to fetch books from database:", error);
    bookStackBooksError = error;
  }

  try {
    if (BookStackUser) {
      BookStackPages = await prisma.bookstack_pages.findMany({ where: { created_by: BookStackUser.id } });
      totalChars = BookStackPages.reduce((acc: number, page: any) => acc + page.chars, 0);
    }
  } catch (error) {
    console.error("Failed to fetch pages from database:", error);
    bookStackPagesError = error;
  }

  try {
    const bookIds = Array.from(new Set(BookStackPages?.map((page: any) => page.book_id) || []));
    editedBooks = await Promise.all(bookIds.map(async (bookId: any) => {
      const book = await prisma.bookstack_books.findUnique({ where: { id: bookId } });
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