import {NextRequest, NextResponse} from "next/server";
import type {ContributionsCalendarProps} from "@/components/UserCardV2/Profile/ContributionsCalendar"
import db from "@/lib/db"
import z from "zod";

interface Contributions {
  date: string;
  count: number;
  type: string;
}

const requestParmas = z.object({
  uid: z.string(),
  page: z.number().min(1).default(1),
  page_size: z.number().min(1).max(20).default(5)
})

type IRequestParmas = z.infer<typeof requestParmas>;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params;
  const { searchParams } = new URL(request.url);
  
  // 使用现有的requestParmas schema解析查询参数
  const queryParams = {
    uid,
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
    page_size: searchParams.get('page_size') ? parseInt(searchParams.get('page_size')!) : 5
  };
  
  const parsedParams = requestParmas.safeParse(queryParams);
  
  if (!parsedParams.success) {
    return NextResponse.json(
      { error: '无效的查询参数', details: parsedParams.error.errors },
      { status: 400 }
    );
  }
  
  const { page, page_size } = parsedParams.data;
  const now = Date.now();
  const year = 366 * 24 * 60 * 60 * 1000;
  const start = new Date(now - year);

  const rawContributions = await db.contributions_history.findMany({
    where: {
      logto_id: uid,
      date: {
        gte: start,
      }
    }
  });

  const mergedContributions: Contributions[] = [];

  rawContributions.forEach(contribution => {
    const index = mergedContributions.findIndex(c => {
      const mergedDay = new Date(c.date).toLocaleDateString("zh-Hans-CN");
      const rawDay = new Date(contribution.date).toLocaleDateString("zh-Hans-CN");
      return mergedDay === rawDay;
    })

    if (index === -1) {
      mergedContributions.push({
        date: new Date(contribution.date).toLocaleDateString("zh-Hans-CN"),
        count: 1,
        type: contribution.type,
      })
    } else {
      mergedContributions[index].count += 1;
    }
  })

  // 对activities进行分页处理
  const sortedActivities = rawContributions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const totalActivities = sortedActivities.length;
  const totalPages = Math.ceil(totalActivities / page_size);
  const offset = (page - 1) * page_size;
  const activities = sortedActivities.slice(offset, offset + page_size);

  return NextResponse.json({
    data: {
      contributions: mergedContributions as ContributionsCalendarProps["contributions"],
      activities: activities,
      pagination: {
        current_page: page,
        page_size: page_size,
        total_items: totalActivities,
        total_pages: totalPages,
        has_next: page < totalPages,
        has_prev: page > 1
      }
    }
  });
}