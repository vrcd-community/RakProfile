"use server";

import { logtoConfig } from "@/lib/config";
import { getLogtoContext } from "@logto/next/server-actions";
import ClientCard from "./Profile";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Settings } from "./Settings";

async function UserCardV2({ uid }: { uid: string }) {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  const isSelf = isAuthenticated ? claims?.sub === uid : false;
  const isAdmin = isAuthenticated ? claims?.roles?.includes("RakAdmin") || false : false;
  const roles = isAuthenticated ? claims?.roles || [] : [];

  if (isSelf) {
    return (
      <Tabs defaultValue="profile">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="settings">设置中心</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ClientCard uid={uid} isSelf={isSelf} isAdmin={isAdmin} roles={roles}/>
        </TabsContent>
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    )
  }

  return <ClientCard uid={uid} isSelf={isSelf} isAdmin={isAdmin} roles={roles}/>;
}

export default async function Wrapper({ uid }: { uid: string }) {
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <UserCardV2 uid={uid} />
    </div>
  )
}