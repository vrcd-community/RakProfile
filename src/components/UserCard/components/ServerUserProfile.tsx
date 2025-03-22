'use server';

import { notFound } from 'next/navigation';
import { useUserData } from "../hooks/useUserData";
import { ErrorCard } from "./ErrorCard";
import { ClientUserProfile } from "./ClientUserProfile";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";

export async function ServerUserProfile({ id, edit }: { id: string, edit: boolean }) {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
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

  const isAdmin = claims?.roles?.includes("RakAdmin") || false;
  const isSelf = isAuthenticated && claims?.sub === id;
  const userData = {
    uid: LogtoUser.logto_id,
    nickname: LogtoUser.name,
    avatar: LogtoUser.avatar,
    bio: (LogtoUser.custom_data.bio || "")
  };

  return (
    <ClientUserProfile
      user={userData}
      admin={isAdmin}
      self={isSelf}
      customData={LogtoUser.custom_data}
      edit={edit && (claims?.roles?.includes("RakAdmin") || (isAuthenticated && claims?.sub === id))}
      id={id}
      stats={{
        booksCount: BookStackBooks.length,
        editedBooksCount: editedBooks.length,
        pagesCount: BookStackPages.length,
        totalChars
      }}
      books={BookStackBooks}
      editedBooks={editedBooks}
    />
  );
}