"use server";

import { logtoConfig } from "@/lib/config";
import { getLogtoContext } from "@logto/next/server-actions";
import UserCardV2 from "./client";

export default async function Wrapper({ uid }: { uid: string }) {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  const isSelf = isAuthenticated ? claims?.sub === uid : false;
  const isAdmin = isAuthenticated ? claims?.roles?.includes("RakAdmin") || false : false;
  const roles = isAuthenticated ? claims?.roles || [] : [];

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <UserCardV2 uid={uid} isSelf={isSelf} isAdmin={isAdmin} roles={roles} />
    </div>
  )
}