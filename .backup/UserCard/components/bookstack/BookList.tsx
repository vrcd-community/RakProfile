"use client"

import type { BookStackStatsProps } from "../BookStackStats";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BookList({ books }: { books: BookStackStatsProps['books'] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 overflow-hidden transition-[max-height] duration-300 ease-in-out ${isExpanded ? 'max-h-[10000px]' : 'max-h-[400px]'}`}
      >
        {books.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <CardTitle className="text-base">
                <Link href={`https://docs.vrcd.org.cn/books/${book.slug}`} className="hover:underline">
                  {book.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3">
                {book.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      {books.length > 3 && (
        <div className="relative mt-4 text-center">
          <div className={`absolute bottom-full left-0 right-0 h-20 bg-gradient-to-t dark:from-[#1C1917] from-[#FFFFFF] to-transparent ${isExpanded ? 'hidden' : 'block'}`} />
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '收起' : '展开更多'}
          </Button>
        </div>
      )}
    </div>
  );
}