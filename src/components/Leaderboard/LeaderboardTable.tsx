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
import DefaultAvatar from "@/assets/icons/DefaultAvatar"

import font from "./fonts.module.css"

const LeaderboardTable = ({ data }: { data: any }) => {
  return (
    <div className="mt-4 relative">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0">
              <TableHead className="w-[100px] border-b-0">#</TableHead>
              <TableHead className="border-b-0">用户名</TableHead>
              <TableHead className="text-right border-b-0">操作</TableHead>
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
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className={`text-right`}>
                  <Link href={`/profile/${item.uid}`} className="text-blue-500 hover:underline">查看资料</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeaderboardTable;