"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Profile } from "./profile";

export interface UserCardV2Props {
  isSelf: boolean;
  isAdmin: boolean;
  uid: string;
  roles: string[]
}

export default function ClientCard({ isSelf, isAdmin, uid, roles }: UserCardV2Props) {
  return (
    <div className="container max-w-4xl mx-auto py-10">
      <Card className="w-full">
        <Profile isSelf={isSelf} isAdmin={isAdmin} uid={uid} roles={roles} />
        <Separator />
        <CardContent className="grid gap-6">

        </CardContent>
      </Card>
    </div>
  )
}