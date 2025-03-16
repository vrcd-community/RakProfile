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
  try {
    LogtoUser = await Logto.getUser(id);
  } catch (error) {
    console.error("Failed to fetch Logto user:", error);
    return <div>Failed to load user information.</div>;
  }

  try {
    const bookStackUsersResponse = await BookStack.userList();
    if (!bookStackUsersResponse.data) {
      console.error("Failed to fetch BookStack user list:", bookStackUsersResponse);
      return <div>加载用户信息失败</div>;
    }
    BookStackUser = bookStackUsersResponse.data.find(u => u.external_auth_id === id);
  } catch (error) {
    console.error("Failed to fetch BookStack user:", error);
    return <div>Failed to load user information.</div>;
  }

  try {
    if (BookStackUser) {
      const bookStackBooksResponse = await BookStack.booksList();
      if (!bookStackBooksResponse.data) {
        console.error("Failed to fetch BookStack book list:", bookStackBooksResponse);
        return <div>Failed to load user information.</div>;
      }
      BookStackBooks = bookStackBooksResponse.data.filter(b => b.owned_by === BookStackUser.id)!;
    }
  } catch (error) {
    console.error("Failed to fetch BookStack books:", error);
    return <div>Failed to load user information.</div>;
  }


  if (!LogtoUser || !BookStackUser) {
    return notFound();
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