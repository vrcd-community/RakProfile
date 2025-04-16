'use server';

import { notFound } from 'next/navigation';
import { useUserData } from "../hooks/useUserData";
import { ErrorCard } from "./ErrorCard";
import { ClientUserProfile } from "./ClientUserProfile";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";
import { ClientUserSettings } from "./settings/ClientUserSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsProvider } from "./settings/SettingsContext";

export async function ServerUserProfile({ id }: { id: string }) {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  const { LogtoUser, BookStackBooks, BookStackPages, editedBooks, totalChars, errors } = await useUserData(id);

  if (!LogtoUser) {
    if (!LogtoUser) {
      return <ErrorCard
        title="加载用户信息失败"
        description="无法加载用户信息，请稍后重试。"
        error={errors.logtoUserError}
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

  const statsData = {
    booksCount: BookStackBooks.length,
    editedBooksCount: editedBooks.length,
    pagesCount: BookStackPages.length,
    totalChars
  };

  const initialData = {
    user: userData,
    isAdmin,
    isSelf,
    stats: statsData,
    books: BookStackBooks,
    editedBooks: editedBooks,
    customData: LogtoUser.custom_data,
  };

  return (
    <div className="container max-w-4xl mx-auto py-10">
      {
        isAdmin && !isSelf && <>
          <p className="text-sm text-red-500 mb-2 w-full text-center">您正在作为管理员强制修改他人资料，请谨慎操作</p>
        </>
      }
      <SettingsProvider initialData={initialData}>
        {isSelf ? (
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">用户资料</TabsTrigger>
              <TabsTrigger value="settings">账号设置</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <ClientUserProfile />
            </TabsContent>
            <TabsContent value="settings">
              <ClientUserSettings />
            </TabsContent>
          </Tabs>
        ) : (
          <ClientUserProfile />
        )}
      </SettingsProvider>
    </div>
  );
}