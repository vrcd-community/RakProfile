'use client';
import { useState } from "react";
import {
  Card
} from "@/components/ui/card"
import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import MFA from "./MFA"
import SocialIdentity from "./SocialIdentity"
import { cn } from "@/lib/utils";

export const Settings = () => {
  const [activeTab, setActiveTab] = useState("mfa");

  return (
    <Card className="w-full px-6 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-muted/50 p-1 rounded-lg">
          <TabsTrigger 
            value="mfa"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
          >
            多因素认证
          </TabsTrigger>
          <TabsTrigger 
            value="social-identity"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
          >
            第三方账号
          </TabsTrigger>
        </TabsList>
        
        <div className="ml-1 relative">
          <div 
            className={cn(
              "transition-all duration-300 ease-in-out",
              activeTab === "mfa" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none absolute top-0 left-0 w-full"
            )}
            aria-hidden={activeTab !== "mfa"}
          >
            <MFA />
          </div>
          
          <div 
            className={cn(
              "transition-all duration-300 ease-in-out",
              activeTab === "social-identity" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none absolute top-0 left-0 w-full"
            )}
            aria-hidden={activeTab !== "social-identity"}
          >
            <SocialIdentity />
          </div>
        </div>
      </Tabs>
    </Card>
  )
}