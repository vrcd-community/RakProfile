"use client";

import { Loading } from "@/components/common/loading";
import type { UserCardV2Props } from ".";
import { useProfile } from "../hooks/useProfile";
import { ErrorCard } from "@/components/UserCard/components/ErrorCard";
import { CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Profile = ({ isSelf, isAdmin, uid, roles }: UserCardV2Props) => {
  const { loading, claims, user, error } = useProfile(isSelf ? "me" : uid);

  if (loading) {
    return <Loading text="加载中..." />;
  }

  if (error) {
    return <ErrorCard title="读取资料卡失败" description={error.message} />;
  }

  return (
    <CardHeader className="flex flex-row items-center gap-4">
      <Avatar className="h-22 w-22">
        <AvatarImage src={claims?.picture ?? ""} alt={claims?.picture ?? ""} />
        <AvatarFallback>{claims?.name.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-2xl font-bold">{claims?.name}</h2>
      </div>
    </CardHeader>
  )
}