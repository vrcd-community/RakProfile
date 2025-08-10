import {useBookstack} from "@/components/UserCardV2/hooks/useBookstack";
import {Loading} from "@/components/common/loading";
import {ErrorCard} from "@/components/common/error";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import {Overview} from "./Overview";
import {Books} from "./Books";

import * as React from "react";

export const BookStack = ({uid}: { uid: string }) => {
  const {bookstack, loading, error} = useBookstack(uid);

  if (loading) {
    return <Loading text="加载中..."/>
  }

  if (error) {
    return <ErrorCard title="加载失败" message={error.message}/>
  }

  return (
    <Tabs defaultValue="statistics">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="statistics">概览</TabsTrigger>
        <TabsTrigger value="books">书籍</TabsTrigger>
      </TabsList>
      <TabsContent value="statistics" className="py-6">
        <Overview bookstack={bookstack!}/>
      </TabsContent>
      <TabsContent value="books" className="py-4">
        <Books bookstack={bookstack!}/>
      </TabsContent>
    </Tabs>
  )
}