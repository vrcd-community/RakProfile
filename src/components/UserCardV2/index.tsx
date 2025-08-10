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
import {Card, CardContent} from "@/components/ui/card";

async function UserCardV2({ uid }: { uid: string }) {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  const isSelf = isAuthenticated ? claims?.sub === uid : false;
  const isAdmin = isAuthenticated ? claims?.roles?.includes("RakAdmin") || false : false;
  const roles = isAuthenticated ? claims?.roles || [] : [];

  const canEdit = isSelf || isAdmin;

  if (canEdit) {
    return (
      <Tabs defaultValue="profile">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="settings">设置中心</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ClientCard uid={uid} isSelf={isSelf} isAdmin={isAdmin} roles={roles}/>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardContent className="p-4 flex flex-col gap-2 items-center justify-center">
              <h1 className="text-2xl font-bold">还没做</h1>
              <h1 className="text-2xl font-bold">\o/</h1>
            </CardContent>
          </Card>
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