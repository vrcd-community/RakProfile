'use server';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { notFound } from 'next/navigation';

import { db } from "@/lib/db";

export default async function UserProfilePage({ id }: { id: string }) {
  let LogtoUser, BookStackUser, BookStackBooks;
  let logtoUserError: any = null;
  let bookStackUserError: any = null;
  let bookStackBooksError: any = null;

  try {
    LogtoUser = await db.User.where("logto_id", id).first();
    if (!LogtoUser) {
      throw new Error("User not found");
    }
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

  if (!LogtoUser || !BookStackUser) {
    if (!LogtoUser && !BookStackUser) {
      return (
        <div className="container max-w-4xl mx-auto py-10">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>加载用户数据失败</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>无法找到与ID {id} 相关的用户信息。</CardDescription>
            </CardContent>
          </Card>
        </div>
      );
    }
    if (!LogtoUser) {
      return (
        <div className="container max-w-4xl mx-auto py-10">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>加载用户信息失败</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>无法加载用户信息，请稍后重试。</CardDescription>
              {logtoUserError && <CardDescription className="text-sm text-gray-500">错误详情: {logtoUserError.message}</CardDescription>}
            </CardContent>
          </Card>
        </div>
      );
    }
    if (!BookStackUser) {
      return (
        <div className="container max-w-4xl mx-auto py-10">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>加载文档库用户信息失败</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>无法加载文档库用户信息，请稍后重试。</CardDescription>
              {bookStackUserError && <CardDescription className="text-sm text-gray-500">错误详情: {bookStackUserError.message}</CardDescription>}
            </CardContent>
          </Card>
        </div>
      );
    }
    return notFound();
  }

  if (bookStackBooksError) {
    return (
      <div className="container max-w-4xl mx-auto py-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>加载文档库书籍信息失败</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>无法加载文档库书籍信息，书籍列表可能无法显示。</CardDescription>
            {bookStackBooksError && <CardDescription className="text-sm text-gray-500">错误详情: {bookStackBooksError.message}</CardDescription>}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <Card className="w-full">
        <CardHeader className="flex flex-col md:flex-row items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={LogtoUser.avatar} alt="User avatar" />
            <AvatarFallback>{LogtoUser.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <CardTitle className="text-2xl">{LogtoUser.name}</CardTitle>
            <CardDescription>{LogtoUser.name}</CardDescription>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-6">
          <div>
            <CardTitle className="text-lg">用户信息</CardTitle>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div>
                <CardDescription>
                  用户ID: {id}
                </CardDescription>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <CardTitle className="text-lg">文档库</CardTitle>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div>
                <CardDescription>
                  拥有书籍总数: <Badge variant="secondary">{BookStackBooks && BookStackBooks.length || 0}</Badge>
                </CardDescription>
              </div>
              <div>
                <CardDescription>
                  用户ID: {BookStackUser.id}
                </CardDescription>
              </div>
            </div>
          </div>
          {
            BookStackBooks && BookStackBooks.length > 0 && (
              <div>
                <Separator />
                <div>
                  <CardTitle className="text-lg">拥有的书籍</CardTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {BookStackBooks.map((book) => (
                      <Card key={book.id}>
                        <CardHeader>
                          <CardTitle className="text-base">
                            <Link href={`https://docs.vrcd.org.cn/books/${book.slug}`} className="hover:underline">
                              {book.name}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-3">
                            {book.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )
          }
        </CardContent>
      </Card>
    </div>
  )
}