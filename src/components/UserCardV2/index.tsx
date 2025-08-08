"use server";

import { logtoConfig } from "@/lib/config";
import { getLogtoContext } from "@logto/next/server-actions";
import ClientCard from "./components";

export default async function UserCardV2({ uid }: { uid: string }) {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  const isSelf = isAuthenticated ? claims?.sub === uid : false;
  const isAdmin = isAuthenticated ? claims?.roles?.includes("RakAdmin") || false : false;
  const roles = isAuthenticated ? claims?.roles || [] : [];

  return <ClientCard uid={uid} isSelf={isSelf} isAdmin={isAdmin} roles={roles}/>;
}