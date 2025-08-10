import {BookItem, type BookStack as IBookStack} from "@/components/UserCardV2/hooks/useBookstack";
import * as React from "react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ExternalLink, ImageOff} from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type BookItemWithType = BookItem & { type: "owned" | "edited" };

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {year: "numeric", month: "short", day: "numeric"});
};

const typeBadge = (t: "owned" | "edited") =>
  t === "owned" ? (
    <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-600">
      创建者
    </Badge>
  ) : (
    <Badge variant="secondary" className="bg-sky-600 text-white hover:bg-sky-600">
      协作者
    </Badge>
  );

const BookItemCard = ({book}: { book: BookItemWithType }) => {
  const {title, description, last_update, cover, url, type} = book;

  return (
    <Card className="h-full hover:shadow-md transition-shadow p-0">
      <CardHeader className="p-0">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-muted">
          {cover ? (
            <img src={cover} alt={title} className="h-full w-full object-cover"/>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              <ImageOff className="h-6 w-6"/>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-3 py-0">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold line-clamp-1">{title}</h3>
          {typeBadge(type)}
        </div>
        {description ? (
          <p className="text-xs text-muted-foreground font-semibold line-clamp-1">{description}</p>
        ) : (
          <p className="text-xs text-muted-foreground italic">暂无简介</p>
        )}
      </CardContent>

      <CardFooter className="p-3 pt-0 flex items-center justify-between text-xs text-muted-foreground">
        <span>更新于 {fmtDate(last_update)}</span>
        <Button asChild size="sm" variant="ghost" className="h-7 px-2">
          <Link href={url} target="_blank" rel="noreferrer">
            打开 <ExternalLink className="ml-1 h-3.5 w-3.5"/>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export const Books = ({bookstack, initialLimit = 6}: {
  bookstack: IBookStack;
  initialLimit?: number;
}) => {
  const books: BookItemWithType[] = React.useMemo(() => {
    const merged: BookItemWithType[] = [
      ...bookstack.books.edited.map((v) => ({...v, type: "edited" as const})),
      ...bookstack.books.owned.map((v) => ({...v, type: "owned" as const})),
    ];

    merged.forEach((item, index, arr) => {
      if (item.type === "owned") {
        const editedIndex = arr.findIndex((v) => v.type === "edited" && v.url === item.url);
        if (editedIndex !== -1) {
          arr.splice(editedIndex, 1);
        }
      }
    })

    return merged.sort(
      (a, b) => new Date(b.last_update).getTime() - new Date(a.last_update).getTime()
    );
  }, [bookstack]);

  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(books.length / initialLimit);
  const startIndex = (currentPage - 1) * initialLimit;
  const visible = books.slice(startIndex, startIndex + initialLimit);

  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5; // 最多显示5个页码

    if (totalPages <= maxVisible) {
      // 如果总页数不超过最大显示数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // 复杂的分页逻辑
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      // 调整显示范围
      if (endPage - startPage < maxVisible - 1) {
        if (startPage === 1) {
          endPage = Math.min(totalPages, startPage + maxVisible - 1);
        } else {
          startPage = Math.max(1, endPage - maxVisible + 1);
        }
      }

      // 第一页
      if (startPage > 1) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink
              onClick={() => setCurrentPage(1)}
              className="cursor-pointer"
            >
              1
            </PaginationLink>
          </PaginationItem>
        );

        if (startPage > 2) {
          items.push(
            <PaginationItem key="ellipsis-start">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
      }

      // 中间页码
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // 最后一页
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          items.push(
            <PaginationItem key="ellipsis-end">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => setCurrentPage(totalPages)}
              className="cursor-pointer"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  if (books.length === 0) {
    return (
      <div className="w-full">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">暂无书籍</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        {visible.map((b, idx) => (
          <BookItemCard key={`${b.url}-${idx}`} book={b}/>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex flex-col items-center gap-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {renderPaginationItems()}

              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <p className="text-sm text-muted-foreground">
            第 {currentPage} 页，共 {totalPages} 页，总计 {books.length} 本书籍
          </p>
        </div>
      )}
    </div>
  );
};