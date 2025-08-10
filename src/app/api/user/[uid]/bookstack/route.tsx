import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  const uid = (await params).uid;

  const bookstack_id = await db.user_link.findFirst({
    where: {
      logto_id: uid,
      platform: "bookstack"
    }
  });

  if (!bookstack_id || !bookstack_id.platform_id) {
    return NextResponse.json({ error: "未找到用户" });
  }

  const platform_id = parseInt(bookstack_id.platform_id);

  const owned_books = await db.bookstack_books.findMany({
    where: {
      owned_by: platform_id
    }
  })

  const edited_books = await db.bookstack_books.findMany({
    where: {
      updated_by: platform_id
    }
  })

  const owned_pages = await db.bookstack_pages.findMany({
    where: {
      owned_by: platform_id
    }
  })

  const edited_pages = await db.bookstack_pages.findMany({
    where: {
      updated_by: platform_id
    }
  })

  const owned_pages_chars = owned_pages.reduce((acc, page) => acc + (page.chars || 0), 0);
  const edited_pages_chars = edited_pages.filter(page => page.owned_by !== platform_id).reduce((acc, page) => acc + (page.chars || 0), 0);
  const total_chars = owned_pages_chars + edited_pages_chars;

  const data = {
    statistics: {
      owned_books: owned_books.length,
      edited_books: edited_books.length,
      owned_pages: owned_pages.length,
      edited_pages: edited_pages.length,
      chars: {
        owned_pages: owned_pages_chars,
        edited_pages: edited_pages_chars,
        total: total_chars
      }
    },
    books: {
      owned: owned_books.map(item => {
        const url = `https://docs.vrcd.org.cn/books/${item.slug}`;

        return {
          title: item.name,
          description: item.description || "No Description",
          last_update: item.updated_at,
          cover: item.cover_url,
          url: url,
        }
      }),
      edited: edited_books.map(item => {
        const url = `https://docs.vrcd.org.cn/books/${item.slug}`;

        return {
          title: item.name,
          description: item.description || "No Description",
          last_update: item.updated_at,
          cover: item.cover_url,
          url: url
        }
      })
    },
    pages: {
      owned: owned_pages.map(item => {
        const url = `https://docs.vrcd.org.cn/books/${item.book_slug}/page/${item.slug}`;

        return {
          title: item.name,
          last_update: item.updated_at,
          url: url
        }
      }),
      edited: edited_pages.map(item => {
        const url = `https://docs.vrcd.org.cn/books/${item.book_slug}/page/${item.slug}`;

        return {
          title: item.name,
          last_update: item.updated_at,
          url: url
        }
      })
    }
  }

  return NextResponse.json({
    data
  });
}