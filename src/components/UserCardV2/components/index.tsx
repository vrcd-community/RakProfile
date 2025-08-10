"use client";

import {Card, CardContent} from "@/components/ui/card";
import {Profile} from "./profile";
import {Separator} from "@/components/ui/separator";
import {useProfile} from "@/components/UserCardV2/hooks/useProfile";
import {Loading} from "@/components/common/loading";
import {ErrorCard} from "@/components/common/error";
import {Bio} from "@/components/UserCardV2/components/Bio";
import {BookStack} from "@/components/UserCardV2/components/BookStack"
import {UserContributions} from "@/components/UserCardV2/components/UserContributions";

export interface UserCardV2Props {
  isSelf: boolean;
  isAdmin: boolean;
  uid: string;
  roles: string[]
}

export default function ClientCard({isSelf, isAdmin, uid, roles}: UserCardV2Props) {
  const {loading, claims, user, error} = useProfile(isSelf ? "me" : uid);

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-10">
        <Loading text="加载中..." card={true}/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto py-10">
        <ErrorCard title="读取资料卡失败" message={error.message}/>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <Card className="w-full">
        <Profile claims={claims} edit={isSelf || isAdmin}/>
        <Separator/>
        <CardContent className="grid gap-6">
          <h2 className="text-lg font-semibold">简介</h2>
          <Bio edit={isSelf || isAdmin} bio={claims?.bio!}/>
        </CardContent>
        <Separator/>
        <CardContent>
          <UserContributions uid={uid}/>
        </CardContent>
        <Separator/>
        <CardContent className="grid gap-6">
          <h2 className="text-lg font-semibold">文档库</h2>
          <BookStack uid={uid}/>
        </CardContent>
      </Card>
    </div>
  )
}