"use server";

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LeaderboardTable from './LeaderboardTable';
import { getBookStackRank } from './rank/bookstackRecently';

const LeaderboardPage = async () => {
  const BookstackRanking = await getBookStackRank();

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4">贡献榜</h1>

      <Tabs defaultValue="docs" className="w-full">
        <TabsList>
        <TabsTrigger value="docs">文档库</TabsTrigger>
        <TabsTrigger value="bbs">论坛</TabsTrigger>
        </TabsList>
        <TabsContent value="docs">
          <LeaderboardTable data={BookstackRanking} />
        </TabsContent>
        <TabsContent value="bbs">
          <p>还没做</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaderboardPage;
