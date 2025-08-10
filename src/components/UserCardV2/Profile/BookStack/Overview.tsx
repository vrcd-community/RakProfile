import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {BookOpen, FileText, Info, PenTool, Users} from "lucide-react";
import {type BookStack as IBookStack} from "@/components/UserCardV2/hooks/useBookstack";

const fmt = (n: number) => {
  if (n == null || Number.isNaN(n)) return "-";
  if (n < 1000) return String(n);
  if (n < 1_000_000) return (n / 1000).toFixed(2).replace(/\.0$/, "") + "K";
  if (n < 1_000_000_000) return (n / 1_000_000).toFixed(2).replace(/\.0$/, "") + "M";
  return (n / 1_000_000_000).toFixed(2).replace(/\.0$/, "") + "B";
};

const StatCard = ({title, value, icon, className = "",}: {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}) => (
  <Card className={`hover:shadow transition-shadow p-3 flex flex-col justify-center ${className}`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 mb-1">
      <CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle>
      <div className="[&_svg]:h-4 [&_svg]:w-4 text-muted-foreground/80">{icon}</div>
    </CardHeader>
    <CardContent className="p-0">
      <div className="text-xl font-semibold leading-tight tracking-tight">{value}</div>
    </CardContent>
  </Card>
);

const StackedBar = ({a, b, total, aLabel = "Owned", bLabel = "Edited",}: {
  a: number;
  b: number;
  total: number;
  aLabel?: string;
  bLabel?: string;
}) => {
  const safeTotal = Math.max(total || 0, a + b); // 防止 total < a+b 的数据异常
  const aPct = safeTotal ? Math.max(0, Math.min(100, (a / safeTotal) * 100)) : 0;
  const bPct = safeTotal ? Math.max(0, Math.min(100, (b / safeTotal) * 100)) : 0;

  return (
    <div className="space-y-2">
      <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-primary/80" style={{width: `${aPct}%`}}/>
        <div className="h-full bg-primary/40 -mt-2.5" style={{width: `${aPct + bPct}%`}}/>
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-sm bg-primary/80"/>
          {aLabel}: {fmt(a)}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-sm bg-primary/40"/>
          {bLabel}: {fmt(b)}
        </span>
      </div>
    </div>
  );
};

export const Overview = ({bookstack}: { bookstack: IBookStack }) => {
  const s = bookstack.statistics;
  const total = s.chars.total ?? 0;
  const ownedChars = s.chars.owned_pages ?? 0;
  const editedChars = s.chars.edited_pages ?? 0;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard title="拥有的书籍" value={fmt(s.owned_books)} icon={<BookOpen/>}/>
        <StatCard title="拥有的页面" value={fmt(s.owned_pages)} icon={<FileText/>}/>
        <StatCard title="参与编辑的书籍" value={fmt(s.edited_books)} icon={<PenTool/>}/>
        <StatCard title="参与编辑的页面" value={fmt(s.edited_pages)} icon={<Users/>}/>

        <Card className="sm:col-span-2 lg:col-span-4 hover:shadow transition-shadow p-3">
          <CardHeader className="flex items-center justify-between space-y-0 p-0 mb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">总字数</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground/70">
                    <Info className="h-3.5 w-3.5"/>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    文档库中的字数总量及其构成（创建 / 编辑）。
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-sm font-semibold">{fmt(total)}</div>
          </CardHeader>
          <CardContent className="p-0">
            <StackedBar a={ownedChars} b={editedChars} total={total} aLabel="Owned" bLabel="Edited"/>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};
