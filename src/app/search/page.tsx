import { Search as SearchComponent } from "@/components/Search";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const awaitedSearchParams = await searchParams;
  const query = awaitedSearchParams.q;

  return (
    <div className="w-full min-h-[calc(100vh-120px)] mt-8 flex flex-col items-center p-8 bg-background">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-foreground mb-2">搜索文档</h1>
        <p className="text-muted-foreground mb-8">在 VRCD 的所有文档中搜索</p>

        <form action="/search" className="w-full flex gap-4 mb-12 p-2 rounded-xl dark:bg-[#202122] bg-[#F1F1F1]">
          <Input
            name="q"
            type="text"
            placeholder="输入关键词搜索..."
            defaultValue={query}
            className="flex-1"
          />
          <Button type="submit" variant="default">
            <SearchIcon className="h-4 w-4 mr-2" />
            搜索
          </Button>
        </form>

        {/* 搜索结果 */}
        <div className="w-full">
          {query && <SearchComponent search={query} />}
        </div>
      </div>
    </div>
  );
}