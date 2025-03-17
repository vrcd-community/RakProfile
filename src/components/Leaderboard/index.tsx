"use server";

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import LeaderboardTable from './LeaderboardTable';

import { BookStack } from '@/lib/external/BookStack';
import { Logto } from '@/lib/external/Logto';

const LeaderboardPage = async () => {
  const books = (await BookStack.booksList()).data;
  const users = (await BookStack.userList()).data;
  const mergedBooks: any = {}

  for (const book of books) {
    if (!mergedBooks[book.owned_by]) mergedBooks[book.owned_by] = [];
    mergedBooks[book.owned_by].push(book);
  }

  const BookstackRanking = (await Promise.all(Object.keys(mergedBooks).map(async (key) => {
    const user = users.find((user) => user.id === parseInt(key))!;
    const book = mergedBooks[key];
    let logtoUser: any = {}

    try {
      logtoUser = (await Logto.getUser(user.external_auth_id))!
    } catch (_) {}

    return {
      name: user.name,
      avatar: logtoUser.avatar ?? user.avatar_url,
      rank: book.length,
      uid: user.external_auth_id
    }
  }))).sort((a, b) => b.rank - a.rank)

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4">排行榜</h1>

      <Tabs defaultValue="docs" className="w-full">
        <TabsList>
          <TabsTrigger value="docs">文档库排行榜</TabsTrigger>
        </TabsList>
        <TabsContent value="docs">
          <LeaderboardTable data={BookstackRanking} title="文档库排行榜" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaderboardPage;