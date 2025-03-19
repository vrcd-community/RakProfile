'use server';

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { notFound } from 'next/navigation';

import { useUserData } from "./hooks/useUserData";
import { ErrorCard } from "./components/ErrorCard";
import { UserProfile } from "./components/UserProfile";
import { BookStackStats } from "./components/BookStackStats";

const numberFormat = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}

export default async function UserProfilePage({ id, edit }: { id: string, edit: boolean }) {
  const { LogtoUser, BookStackUser, BookStackBooks, BookStackPages, editedBooks, totalChars, errors } = await useUserData(id);

  if (!LogtoUser || !BookStackUser) {
    if (!LogtoUser && !BookStackUser) {
      return <ErrorCard 
        title="加载用户数据失败" 
        description={`无法找到与ID ${id} 相关的用户信息。`} 
      />;
    }
    if (!LogtoUser) {
      return <ErrorCard 
        title="加载用户信息失败" 
        description="无法加载用户信息，请稍后重试。" 
        error={errors.logtoUserError} 
      />;
    }
    if (!BookStackUser) {
      return <ErrorCard 
        title="加载文档库用户信息失败" 
        description="无法加载文档库用户信息，请稍后重试。" 
        error={errors.bookStackUserError} 
      />;
    }
    return notFound();
  }

  if (errors.bookStackBooksError) {
    return <ErrorCard 
      title="加载文档库书籍信息失败" 
      description="无法加载文档库书籍信息，书籍列表可能无法显示。" 
      error={errors.bookStackBooksError} 
    />;
  }

  if (errors.bookStackPagesError) {
    return <ErrorCard 
      title="加载文档库页面信息失败" 
      description="无法加载文档库页面信息，页面列表可能无法显示。" 
      error={errors.bookStackPagesError} 
    />;
  }

  if (errors.editedBooksError) {
    return <ErrorCard 
      title="加载参与编辑的书籍信息失败" 
      description="无法加载参与编辑的书籍信息，书籍列表可能无法显示。" 
      error={errors.editedBooksError} 
    />;
  }

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <Card className="w-full">
        <UserProfile 
          user={{
            nickname: LogtoUser.name,
            avatar: LogtoUser.avatar,
            bio: LogtoUser.customData?.bio
          }}
          edit={edit}
          id={id} 
        />
        <Separator />
        <CardContent className="grid gap-6">
          <BookStackStats 
            stats={{
              booksCount: BookStackBooks.length,
              editedBooksCount: editedBooks.length,
              pagesCount: BookStackPages.length,
              totalChars
            }}
            books={BookStackBooks}
            editedBooks={editedBooks}
            numberFormat={numberFormat}
          />
        </CardContent>
      </Card>
    </div>
  );
}