"use server";

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LeaderboardTable from './LeaderboardTable';
import { getBookStackRank } from './rank/bookstack';

const LeaderboardPage = async () => {
  const BookstackRanking = await getBookStackRank();

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4">贡献榜</h1>

      <Tabs defaultValue="docs" className="w-full">
        <TabsList>
          <TabsTrigger value="docs">文档库近期贡献</TabsTrigger>
        </TabsList>
        <TabsContent value="docs">
          <LeaderboardTable data={BookstackRanking} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaderboardPage;
