import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookMarked, Database, FileText, BookOpen, ChevronRight, Goal } from "lucide-react";

const AppCard = ({ title, description, icon: Icon, color, link }: any) => {
  return (
    <Link href={link} target="_blank" className={`rounded-xl overflow-hidden flex flex-row justify-between shadow hover:shadow-xl transition group`} style={{ borderColor: color, borderWidth: "2px", backgroundColor: color }}>
      <div className="p-4 flex items-center justify-between rounded rounded-r-xl dark:rounded-r-2xl flex-1 dark:bg-black/90 bg-white/94">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[18px] font-semibold dark:text-white text-black">{title}</p>
            <Icon className="h-5 w-5" style={{ color: color }} />
          </div>
          <p className="text-[13px] text-black dark:text-gray-400 mt-2">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-end p-0.5 transition-all duration-200 group-hover:p-1.5">
        <ChevronRight className="h-5 w-5" />
      </div>
    </Link>
  );
};

const RecentlyCard = ({ title, description, icon: Icon, color, link }: any) => {
  return (
    <Link href={link} target="_blank" className={`rounded-xl overflow-hidden flex flex-row justify-between shadow hover:shadow-md transition-all group min-w-[290px]`} style={{ borderColor: color, borderWidth: "2px", backgroundColor: color }}>
      <div className="p-4 rounded flex-1 dark:bg-black/90 bg-white/94">
        <div className="flex justify-between w-full items-center">
          <p className="text-[18px] font-semibold dark:text-white text-black">{title}</p>
          <Icon className="h-5 w-5" style={{ color: color }} />
        </div>
        <div>
          <p className="text-[13px] text-black dark:text-gray-400 mt-2">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default async function Home() {
  const apps = [{
    title: "VRChat 汉化文档",
    description: "VRChat 官方文档的汉化项目",
    icon: BookMarked,
    color: "#24BC9C",
    link: "https://docs.vrczh.org/",
  }, {
    title: "VRChat 入门包",
    description: "带你零基础学习制作虚拟角色",
    icon: Goal,
    color: "#F0D826",
    link: "https://docs.vrcd.org.cn/books/vrchat",
  }, {
    title: "VPM 镜像库",
    description: "分流镜像，更便捷的 VPM 加速",
    icon: Database,
    color: "#1E80A0",
    link: "https://vcc.vrczh.org/",
  }, {
    title: "VRCD 论坛",
    description: "深入了解 VRCD 和常见服务",
    icon: FileText,
    color: "#4C8045",
    link: "https://bbs.vrcd.org.cn/",
  }, {
    title: "文档库",
    description: "教程、开发、开源项目等资源汇总",
    icon: BookOpen,
    color: "#867CAC",
    link: "https://docs.vrcd.org.cn/",
  }, {
    title: "VRCD Wiki",
    description: "深入了解 VRCD 和配置服务",
    icon: BookOpen,
    color: "#BFC49F",
    link: "https://wiki.vrcd.org.cn/",
  }]

  return (
    <div className="w-full min-h-[calc(100vh-120px)] mt-8 flex flex-col items-center p-8 bg-background">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-10">
        <div className="flex-5/6">
          <h1 className="text-4xl font-bold text-foreground mb-2">虚拟现实中文开发者社区</h1>
          <p className="text-muted-foreground mb-8">——酷酷的鼠鼠</p>

          {/* 搜索框 */}
          <div className="w-full max-w-2xl flex gap-4 mb-12 p-2 rounded-xl dark:bg-[#202122] bg-[#F1F1F1]">
            <Input
              type="text"
              placeholder="如何用 Udon# 拉拖大的"
              className="flex-1"
            />
            <Button variant="default">
              <Search className="h-4 w-4 mr-2" />
              搜索
            </Button>
          </div>
        </div>

        {/* 卡片网格 */}
        <div className="flex-1 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {apps.map((card, index) => (<AppCard key={index} {...card} />))}
        </div>
      </div>

      <div className="w-full max-w-6xl mt-16">
        <h1 className="text-4xl font-bold text-foreground mb-2">最近更新</h1>
        <div className="w-full relative">
          <div className="flex flex-row gap-4 mt-8 overflow-x-auto pb-4 scrollbar-hide">
            {
              Array.from({ length: 10 }).fill({
                title: "VRChat 汉化文档",
                description: "VRChat 官方文档的汉化项目",
                icon: BookMarked,
                color: "#24BC9C",
                link: "https://docs.vrczh.org/",
              }).map((data, index) => (<RecentlyCard key={index} {...data as any} />))
            }
          </div>
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
