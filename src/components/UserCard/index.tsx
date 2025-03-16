'use server';

import { BookStack } from "@/lib/external/BookStack";
import { Logto } from "@/lib/external/Logto";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { notFound } from 'next/navigation';

export default async function UserProfilePage({ id }: { id: string }) {
  let LogtoUser, BookStackUser, BookStackBooks;
  let logtoUserError: any = null;
  let bookStackUserError: any = null;
  let bookStackBooksError: any = null;

  try {
    LogtoUser = await Logto.getUser(id);
  } catch (error) {
    console.error("Failed to fetch Logto user:", error);
    logtoUserError = error;
  }

  try {
    const bookStackUsersResponse = await BookStack.userList();
    if (!bookStackUsersResponse.data) {
      console.error("Failed to fetch BookStack user list:", bookStackUsersResponse);
      bookStackUserError = bookStackUsersResponse;
    } else {
      BookStackUser = bookStackUsersResponse.data.find(u => u.external_auth_id === id);
      if (!BookStackUser) {
        bookStackUserError = new Error("BookStack user not found for given Logto ID");
      }
    }
  } catch (error) {
    console.error("Failed to fetch BookStack user:", error);
    bookStackUserError = error;
  }

  try {
    if (BookStackUser) {
      const bookStackBooksResponse = await BookStack.booksList();
      if (!bookStackBooksResponse.data) {
        console.error("Failed to fetch BookStack book list:", bookStackBooksResponse);
        bookStackBooksError = bookStackBooksResponse;
      } else {
        BookStackBooks = bookStackBooksResponse.data.filter(b => b.owned_by === BookStackUser.id)!;
      }
    }
  } catch (error) {
    console.error("Failed to fetch BookStack books:", error);
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
              <CardDescription>无法找到与ID {id} 相关的 Logto 用户和 BookStack 用户信息。</CardDescription>
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
              <CardTitle>加载 Logto 用户信息失败</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>无法加载 Logto 用户信息，请稍后重试。</CardDescription>
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
              {bookStackUserError && <CardDescription className="text-sm text-gray-500">错误详情: {bookStackUserError.message ? bookStackUserError.message : JSON.stringify(bookStackUserError)}</CardDescription>}
            </CardContent>
          </Card>
        </div>
      );
    }
    return notFound(); // Fallback to notFound if logic somehow misses cases above
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
            {bookStackBooksError && <CardDescription className="text-sm text-gray-500">错误详情: {bookStackBooksError.message ? bookStackBooksError.message : JSON.stringify(bookStackBooksError)}</CardDescription>}
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
            <CardDescription>{LogtoUser.username}</CardDescription>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-6">
          <div>
            <CardTitle className="text-lg">用户信息</CardTitle>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div>
                <CardDescription>
                  注册时间: {new Date(LogtoUser.createdAt).toLocaleString('zh-CN')}
                </CardDescription>
              </div>
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
                    {BookStackBooks.length > 0 ? (
                      BookStackBooks.map((book) => (
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
                      ))
                    ) : (
                      <CardDescription>该用户没有书籍。</CardDescription>
                    )}
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