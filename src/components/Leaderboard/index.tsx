import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import LeaderboardTable from './LeaderboardTable';

const LeaderboardPage = () => {
  const dailyLeaderboardData = [
    { rank: 1, username: 'User A', score: 1500 },
    { rank: 2, username: 'User B', score: 1450 },
    { rank: 3, username: 'User C', score: 1400 },
  ];

  const weeklyLeaderboardData = [
    { rank: 1, username: 'User X', score: 12000 },
    { rank: 2, username: 'User Y', score: 11500 },
    { rank: 3, username: 'User Z', score: 11000 },
  ];

  const monthlyLeaderboardData = [
    { rank: 1, username: 'User Alpha', score: 50000 },
    { rank: 2, username: 'User Beta', score: 48000 },
    { rank: 3, username: 'User Gamma', score: 45000 },
  ];

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4">排行榜</h1>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">每日榜</TabsTrigger>
          <TabsTrigger value="weekly">每周榜</TabsTrigger>
          <TabsTrigger value="monthly">每月榜</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <LeaderboardTable data={dailyLeaderboardData} title="每日排行榜" />
        </TabsContent>
        <TabsContent value="weekly">
          <LeaderboardTable data={weeklyLeaderboardData} title="每周排行榜" />
        </TabsContent>
        <TabsContent value="monthly">
          <LeaderboardTable data={monthlyLeaderboardData} title="每月排行榜" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaderboardPage;