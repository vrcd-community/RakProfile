import {NextRequest, NextResponse} from "next/server";
import type {ContributionsCalendarProps} from "@/components/UserCardV2/components/ContributionsCalendar"
import db from "@/lib/db"

interface Contributions {
  date: string;
  count: number;
  type: string;
}

export async function GET(request: NextRequest, { params }: { params: { uid: string } }) {
  const uid = (await params).uid;
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

  const activities = rawContributions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8)

  return NextResponse.json({
    data: {
      contributions: mergedContributions as ContributionsCalendarProps["contributions"],
      activities: activities
    }
  });
}