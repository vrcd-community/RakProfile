import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookList } from "./bookstack/BookList";

export interface BookStackStatsProps {
  stats: {
    booksCount: number;
    editedBooksCount: number;
    pagesCount: number;
    totalChars: number;
  };
  books: Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
  }>;
  editedBooks: Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
  }>;
  numberFormat: (number: number) => string;
}

function StatsGrid({ stats, numberFormat }: Pick<BookStackStatsProps, 'stats' | 'numberFormat'>) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-2">
      <div>
        <CardDescription>
          拥有书籍总数: <Badge variant="outline">{stats.booksCount}</Badge>
        </CardDescription>
      </div>
      <div>
        <CardDescription>
          参与编辑的书籍: <Badge variant="outline">{stats.editedBooksCount}</Badge>
        </CardDescription>
      </div>
      <div>
        <CardDescription>
          创建的页面总数: <Badge variant="outline">{stats.pagesCount}</Badge>
        </CardDescription>
      </div>
      <div>
        <CardDescription>
          总字数: <Badge variant="outline">{numberFormat(stats.totalChars)}</Badge>
        </CardDescription>
      </div>
    </div>
  );
}

export function BookStackStats({ stats, books, editedBooks, numberFormat }: BookStackStatsProps) {
  return (
    <>
      <div>
        <CardTitle className="text-lg">文档库</CardTitle>
        <Tabs defaultValue="stats" className="mt-4">
          <TabsList>
            <TabsTrigger value="stats">统计信息</TabsTrigger>
            {books.length > 0 && <TabsTrigger value="owned">拥有的书籍</TabsTrigger>}
            {editedBooks.length > 0 && <TabsTrigger value="edited">参与编辑的书籍</TabsTrigger>}
          </TabsList>
          <TabsContent value="stats">
            <StatsGrid stats={stats} numberFormat={numberFormat} />
          </TabsContent>
          {books.length > 0 && (
            <TabsContent value="owned">
              <BookList books={books} />
            </TabsContent>
          )}
          {editedBooks.length > 0 && (
            <TabsContent value="edited">
              <BookList books={editedBooks} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </>
  );
}