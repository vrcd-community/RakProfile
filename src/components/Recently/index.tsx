import prisma from "@/lib/db";
import Link from "next/link";
import { BookMarked } from "lucide-react";

export const getRecently = async () => {
  const data = await prisma.bookstack_pages.findMany({
    orderBy: { updated_at: "desc" },
    take: 10
  });
  
  return data.map((item: any) => ({
    title: item.name,
    description: `更新于 ${new Date(item.updated_at).toLocaleDateString("zh-CN")}`,
    icon: BookMarked,
    color: "#867CAC",
    link: `https://docs.vrcd.org.cn/books/${item.book_slug}/page/${item.slug}`
  }))
}

const RecentlyCard = ({ title, description, icon: Icon, color, link }: any) => {
  return (
    <Link href={link} target="_blank" className={`rounded-xl overflow-hidden flex flex-row justify-between shadow hover:shadow-md transition-all group min-w-[290px]`} style={{ borderColor: color, borderWidth: "2px", backgroundColor: color }}>
      <div className="p-4 rounded flex-1 dark:bg-black/90 bg-white/94">
        <div className="flex justify-between w-full items-center">
          <p className="text-[18px] font-semibold dark:text-white text-black w-[220px] truncate text-ellipsis">{title}</p>
          <Icon className="h-5 w-5" style={{ color: color }} />
        </div>
        <div>
          <p className="text-[13px] text-black dark:text-gray-400 mt-2">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default async function Recently() {
  const data = await getRecently();

  return (
    <div className="w-full relative">
      <div className="flex flex-row gap-4 mt-8 overflow-x-auto pb-4 scrollbar-hide">
        {
          data.map((item: any, index: number) => (
            <RecentlyCard key={index} {...item} />
          ))
        }
      </div>
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  )
}