import {ContributionsCalendar} from "./ContributionsCalendar";
import {ActiveItem, useContributions} from "../hooks/useContributions";
import {Loading} from "@/components/common/loading";
import {ErrorCard} from "@/components/common/error";
import {Card} from "@/components/ui/card";
import * as React from "react";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

import {Activity as ActivityIcon, BookOpen,} from "lucide-react";


const ActivityIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  bookstack: BookOpen
};

const ResourceTypeMap: Record<string, string> = {
  bookstack: "文档库"
};

function formatRelative(input: string | Date) {
  const d = new Date(input);
  const diff = Date.now() - d.getTime();
  const abs = Math.abs(diff);
  const minute = 60_000, hour = 3_600_000, day = 86_400_000, week = 604_800_000;

  const rtf = new Intl.RelativeTimeFormat("zh-Hans-CN", {numeric: "auto"});
  if (abs < hour) return rtf.format(-Math.round(diff / minute), "minute");
  if (abs < day) return rtf.format(-Math.round(diff / hour), "hour");
  if (abs < week) return rtf.format(-Math.round(diff / day), "day");
  return new Intl.DateTimeFormat("zh-Hans-CN", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit"
  }).format(d);
}

const ActionBadge = ({type}: { type: string }) => {
  const isEdit = type === "edit";
  return (
    <Badge
      variant={isEdit ? "secondary" : "default"}
      className={cn(
        "h-5 px-2 text-[11px] rounded-md",
        isEdit ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200"
          : "bg-emerald-600 hover:bg-emerald-600 text-white"
      )}
    >
      {isEdit ? "编辑" : "创建"}
    </Badge>
  );
};
export const ActivityItem = ({ active }: { active: ActiveItem }) => {
  const resourceType = active.resource_id.split(":")[0] || "unknown";
  const Icon = ActivityIcons[resourceType] ?? ActivityIcon;

  return (
    <div className="relative pl-7 sm:pl-8 py-3 group">
      <span className="absolute left-3 sm:left-3.5 top-0 bottom-0 w-px bg-border/70" aria-hidden />
      <span className="absolute left-3 sm:left-3.5 top-1.5 h-px w-full bg-border/70" aria-hidden />
      <span
        className="absolute left-[7px] sm:left-[9px] top-0 h-3 w-3 rounded-full bg-primary/80 ring-2 ring-background group-hover:scale-110 transition-transform"
        aria-hidden
      />

      {/* 主体行：小屏允许换行，避免溢出 */}
      <div className="rounded-lg px-2 py-2 mt-2.5 hover:bg-muted/60 transition-colors">
        <div className="flex items-start sm:items-center gap-3">
          <div className="mt-[2px] shrink-0 text-muted-foreground">
            <Icon className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <ActionBadge type={active.type} />
              <span className="text-sm text-muted-foreground">了</span>

              <Link
                href={active.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium hover:text-primary min-w-0"
                title={active.message}
              >
                <span className="block break-all sm:break-normal sm:truncate sm:line-clamp-1">
                  {active.message || "（无标题）"}
                </span>
              </Link>
            </div>

            <div className="mt-1 flex items-center gap-2 text-[11px]">
              <span className="text-muted-foreground/80">
                {ResourceTypeMap[resourceType] || resourceType}
              </span>

              <span className="inline sm:hidden text-muted-foreground/40">•</span>

              <span className="ml-auto text-muted-foreground whitespace-normal sm:whitespace-nowrap">
                {formatRelative(active.date)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserContributions = ({uid}: { uid: string }) => {
  const {data, loading, error} = useContributions(uid);

  if (loading) {
    return <Loading text="加载中..."/>
  }

  if (error) {
    return <ErrorCard title="加载失败" message={error.message}/>
  }

  return (
    <div className="grid gap-4">
      <h2
        className="text-sm font-light ml-1">在过去一年中，共进行了 {data?.contributions?.reduce((prev, cur) => prev + cur.count, 0)} 次内容创作</h2>
      <Card className="w-full px-2 py-6 flex items-center justify-center overflow-x-auto">
        <ContributionsCalendar contributions={data?.contributions!}/>
      </Card>
      <div>
        {data?.activities?.map((a: ActiveItem) => (
          <ActivityItem key={`${a.resource_id}-${a.date}`} active={a}/>
        ))}
      </div>
    </div>
  )
};