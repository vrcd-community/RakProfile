"use client";

import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import Link from 'next/link';
import FullScreenLoading from '../FullScreenLoading';
import DefaultAvatar from "@/assets/DefaultAvatar"

import font from "./fonts.module.css"

const LeaderboardTable = ({ data, title }: { data: any; title: string }) => {
  const [loading, setLoading] = useState(false);

  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <div className="mt-4 relative">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0">
              <TableHead className="w-[100px] border-b-0">排名</TableHead>
              <TableHead className="border-b-0">用户名</TableHead>
              <TableHead className="text-right border-b-0">活跃分</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any, index: number) => (
              <TableRow key={index} className="border-b-0">
                <TableCell className={`${font.OutfitBold} text-2xl border-b-0`}><span className='border-1 dark:border-white border-black py-1 w-[75px] block text-center'>{index + 1}</span></TableCell>
                <TableCell className="border-b-0">
                  <div className="flex items-center space-x-2">
                    {
                      item.avatar ?
                      <img src={item.avatar} alt="avatar" width={32} height={32} className="rounded-full"/> :
                      <DefaultAvatar className="w-[32px] h-[32px] rounded-full"/>
                    }
                    <Link href={`/profile/${item.uid}`}>
                      <span
                        className="hover:underline cursor-pointer"
                        onClick={handleLinkClick}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </div>
                </TableCell>
                <TableCell className={`text-right ${font.OutfitBold} text-2xl border-b-0`}>{item.rank}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {loading && <FullScreenLoading />}
    </div>
  );
};

export default LeaderboardTable;