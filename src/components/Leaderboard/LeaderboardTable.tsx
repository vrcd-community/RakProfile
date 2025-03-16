import React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import Link from 'next/link'; // 假设你使用 Next.js，如果不是，请替换为你的路由库

import font from "./fonts.module.css"

const LeaderboardTable = ({ data, title }: { data: any; title: string }) => {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">排名</TableHead>
              <TableHead>用户名</TableHead>
              <TableHead className="text-right">积分</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell className={`${font.OutfitBold} text-2xl`}>No. {index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.avatar}
                      alt={`${item.name} 头像`}
                      className="rounded-full w-8 h-8"
                    />
                    <Link href={`/profile/${item.uid}`}>
                      <span className="hover:underline cursor-pointer">{item.name}</span>
                    </Link>
                  </div>
                </TableCell>
                <TableCell className={`text-right ${font.OutfitBold} text-2xl`}>{item.rank}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeaderboardTable;