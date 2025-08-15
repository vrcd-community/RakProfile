import * as React from "react";
import {useTheme} from "next-themes";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export interface ContributionsCalendarProps {
  contributions: Array<{
    date: string;
    count: number;
    type: string;
  }>;
}

const CELL = 10;
const GAP = 4;
const COLS = 53;
const ROWS = 7;

export const STROKE_LIGHT = "#E7E5E4"; // stone-200 方向，柔一点

export const COLORS_LIGHT = [
  "#EEF2F1", // 0
  "#BAE7C2", // 1
  "#6FD58B", // 2
  "#46B96E", // 3
  "#2C8E52", // 4
];

// 网格描边（适配 #18181B 背景的中性色调）
export const STROKE_DARK = "#27272A";

// 空格子的底色：基于 #18181B 背景制作的渐进色阶
export const COLORS_DARK = [
  "#1F1F23", // 0
  "#0F2A1A", // 1
  "#1A4A2E", // 2
  "#2D6A42", // 3
  "#4ADE80", // 4
];

function ymd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDayLocal(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(d: Date, days: number) {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + days);
  return nd;
}

function getSundayBeforeOrEqual(d: Date) {
  const nd = startOfDayLocal(d);
  const day = nd.getDay(); // 0=Sun
  return addDays(nd, -day);
}

function quantile(sorted: number[], q: number) {
  if (sorted.length === 0) return 0;
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  return sorted[base];
}

function buildBuckets(counts: number[]) {
  const nonZero = counts.filter((n) => n > 0).sort((a, b) => a - b);
  if (nonZero.length === 0) {
    return {t1: 0, t2: 0, t3: 0};
  }
  const t1 = Math.max(1, Math.round(quantile(nonZero, 0.25)));
  const t2 = Math.max(t1 + 1, Math.round(quantile(nonZero, 0.5)));
  const t3 = Math.max(t2 + 1, Math.round(quantile(nonZero, 0.75)));
  return {t1, t2, t3};
}

function levelForCount(n: number, buckets: { t1: number; t2: number; t3: number }) {
  if (n <= 0) return 0;
  if (n <= buckets.t1) return 1;
  if (n <= buckets.t2) return 2;
  if (n <= buckets.t3) return 3;
  return 4;
}

function buildDataMap(contribs: ContributionsCalendarProps["contributions"]) {
  const map = new Map<string, { total: number; owned: number; edited: number }>();
  for (const c of contribs) {
    const d = ymd(startOfDayLocal(new Date(c.date)));
    const prev = map.get(d) ?? {total: 0, owned: 0, edited: 0};
    const owned = prev.owned + (c.type === "owned" ? c.count : 0);
    const edited = prev.edited + (c.type === "edited" ? c.count : 0);
    map.set(d, {total: prev.total + c.count, owned, edited});
  }
  return map;
}

function buildGrid(contribs: ContributionsCalendarProps["contributions"]) {
  const today = startOfDayLocal(new Date());
  // end at current week (Sunday-aligned), like GitHub
  const endSunday = getSundayBeforeOrEqual(today);
  const start = addDays(endSunday, -(COLS - 1) * 7);

  const map = buildDataMap(contribs);

  const days: Array<{
    date: Date;
    key: string;
    total: number;
    weekIdx: number;
    dayIdx: number;
  }> = [];

  for (let w = 0; w < COLS; w++) {
    for (let d = 0; d < ROWS; d++) {
      const date = addDays(start, w * 7 + d);
      const key = ymd(date);
      const rec = map.get(key) ?? {total: 0};
      days.push({date, key, total: rec.total, weekIdx: w, dayIdx: d});
    }
  }

  const counts = days.map((x) => x.total);
  const buckets = buildBuckets(counts);

  return {days, buckets, start, end: addDays(start, COLS * 7 - 1)};
}

function monthLabels(start: Date) {
  const labels: Array<{ x: number; text: string }> = [];
  let cur = new Date(start);
  let lastMonth = -1;
  for (let w = 0; w < COLS; w++) {
    const d = addDays(cur, w * 7);
    const m = d.getMonth();
    if (m !== lastMonth) {
      labels.push({x: w * (CELL + GAP), text: d.toLocaleString(undefined, {month: "short"})});
      lastMonth = m;
    }
  }
  return labels;
}

export const ContributionsCalendar: React.FC<ContributionsCalendarProps> = ({contributions}) => {
  const {days, buckets, start, end} = React.useMemo(() => buildGrid(contributions), [contributions]);

  const theme = useTheme();
  const COLORS = theme.resolvedTheme === "dark" ? COLORS_DARK : COLORS_LIGHT;
  const STROKE = theme.resolvedTheme === "dark" ? STROKE_DARK : STROKE_LIGHT;

  const width = COLS * CELL + (COLS - 1) * GAP;
  const height = ROWS * CELL + (ROWS - 1) * GAP;

  const sharedWidth = width + 40

  const mLabels = monthLabels(start);

  return (
    <TooltipProvider delayDuration={100}>
      <div className="overflow-x-auto">
        <div className={`text-xs text-muted-foreground mb-2 flex items-center justify-between`}
             style={{width: sharedWidth}}>
          <div className="flex items-center gap-2">
            <span>{start.toLocaleDateString()}</span>
            <span>–</span>
            <span>{end.toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="mr-1">Less</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <span
                key={lvl}
                className="inline-block h-3 w-3 rounded-[2px] border"
                style={{backgroundColor: COLORS[lvl], borderColor: "#e5e7eb"}}
                aria-hidden
              />
            ))}
            <span className="ml-1">More</span>
          </div>
        </div>

        <svg width={sharedWidth} height={height + 26} role="img" aria-label="Contributions calendar"
             className="select-none">
          {mLabels.map((m) => (
            <text key={m.x} x={m.x + 24} y={10} className="fill-current text-[10px]" fill="#6b7280">
              {m.text}
            </text>
          ))}

          {([1, 3, 5] as const).map((dIdx) => (
            <text key={dIdx} x={0} y={26 + dIdx * (CELL + GAP)} className="fill-current text-[10px]" fill="#6b7280">
              {new Date(2024, 0, dIdx + 7).toLocaleDateString(undefined, {weekday: "short"}).slice(0, 3)}
            </text>
          ))}

          <g transform={`translate(24, 16)`}>
            {days.map((item) => {
              const lvl = levelForCount(item.total, buckets);
              const x = item.weekIdx * (CELL + GAP);
              const y = item.dayIdx * (CELL + GAP);
              const title = `${item.total} contribution${item.total === 1 ? "" : "s"} on ${item.date.toDateString()}`;

              const key = `${item.weekIdx}-${item.dayIdx}`;

              return (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <rect
                      key={item.key}
                      x={x}
                      y={y}
                      width={CELL}
                      height={CELL}
                      rx={2}
                      ry={2}
                      fill={COLORS[lvl]}
                      stroke={STROKE}
                      strokeWidth={0.5}
                    ></rect>
                  </TooltipTrigger>
                  <TooltipContent>{title}</TooltipContent>
                </Tooltip>
              );
            })}
          </g>
        </svg>
      </div>
    </TooltipProvider>
  );
};
