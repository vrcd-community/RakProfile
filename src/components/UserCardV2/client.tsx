'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Settings } from "./Settings";
import ClientCard from "./Profile";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  uid: string;
  isSelf: boolean;
  isAdmin: boolean;
  roles: string[];
}

export default function UserCardV2({ uid, isSelf, isAdmin, roles }: Props) {
  const [activeTab, setActiveTab] = useState("profile");

  if (isSelf) {
    return (
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="settings">设置中心</TabsTrigger>
        </TabsList>
        
        <div className="ml-1 relative">
          <div
            className={cn(
              "transition-all duration-300 ease-in-out",
              activeTab === "profile" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none absolute top-0 left-0 w-full"
            )}
            aria-hidden={activeTab !== "profile"}
          >
            <ClientCard uid={uid} isSelf={isSelf} isAdmin={isAdmin} roles={roles}/>
          </div>
          <div 
            className={cn(
              "transition-all duration-300 ease-in-out",
              activeTab === "settings" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none absolute top-0 left-0 w-full"
            )}
            aria-hidden={activeTab !== "settings"}
          >
            <Settings />
          </div>
        </div>
      </Tabs>
    )
  }

  return <ClientCard uid={uid} isSelf={isSelf} isAdmin={isAdmin} roles={roles}/>;
}