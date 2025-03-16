import React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table" // 假设你的 table 组件路径

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
                <TableCell className="font-medium">{item.rank}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell className="text-right">{item.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
