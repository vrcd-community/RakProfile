"use server";

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import LeaderboardTable from './LeaderboardTable';

import { getBookStackRank } from './rank/bookstack';

export async function getServerSideProps() {
  // 从数据库获取数据
  const BookstackRanking = await getBookStackRank();

  return {
    props: {
      BookstackRanking,
    },
  };
}

const LeaderboardPage = async ({ BookstackRanking }: any) => {

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4">排行榜</h1>

      <Tabs defaultValue="docs" className="w-full">
        <TabsList>
          <TabsTrigger value="docs">文档库活跃分</TabsTrigger>
        </TabsList>
        <TabsContent value="docs">
          <LeaderboardTable data={BookstackRanking} title="文档库活跃分" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaderboardPage;
