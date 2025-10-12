import Link from "next/link";

import img0 from "@/assets/intro-images/VRChat_2024-02-22_22-33-55.530_7680x4320_1080p.jpg";
import img2 from "@/assets/intro-images/VRChat_2025-07-12_23-11-33.962_1920x1080.png";
import img5 from "@/assets/intro-images/VRChat_2025-02-01_22-18-24.441_3840x2160_1080p.jpg";
import img6 from "@/assets/intro-images/VRChat_2025-02-05_04-15-44.472_3840x2160_1080p.jpg";
import img7 from "@/assets/intro-images/F66F251AE50B347CCE02A3AA94D45211_1080p.jpg";
import img8 from "@/assets/intro-images/VRChat_2024-12-01_22-42-40.502_3840x2160_1080p.jpg";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookMarked, Database, FileText, BookOpen, ChevronRight, Goal } from "lucide-react";
import Recently, { getRecently } from "@/components/Recently";
// import LeaderboardPage from "@/components/Leaderboard";
import { Carousel } from "@/components/carousel";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getRecently();

  return {
    title: "VRCD - 欢迎",
    description: "我们是一个刚刚起步的面向玩家，初高级开发者，内容创作者的共创开源社区，在这里，您可以找到一众优秀的 VR 内容创作者与热心好学的新兴创作力量。",
    openGraph: {
      title: "VRCD - 欢迎",
      description: "我们是一个刚刚起步的面向玩家，初高级开发者，内容创作者的共创开源社区，在这里，您可以找到一众优秀的 VR 内容创作者与热心好学的新兴创作力量。",
      type: "website"
    },
    archives: posts.map(item => item.link)
  }
}

const AppCard = ({ title, description, icon: Icon, color, link }: any) => {
  return (
    <Link href={link} target="_blank" className={`rounded-lg overflow-hidden flex flex-row justify-between shadow hover:shadow-xl transition group`} style={{ borderColor: color, borderWidth: "2px", backgroundColor: color }}>
      <div className="p-4 flex items-center justify-between rounded rounded-r-lg dark:rounded-r-xl flex-1 dark:bg-[#202122]/96 bg-[#FFFFFF]/96">
        <div>
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" style={{ color: color }} />
            <p className="text-[18px] font-semibold" style={{ color: color }}>{title}</p>
          </div>
          <p className="text-[13px] text-black dark:text-gray-400 mt-2">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-end p-1 transition-all duration-200 group-hover:p-2">
        <ChevronRight className="h-5 w-5" />
      </div>
    </Link>
  );
};

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
  color: "#F09926",
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
  color: "#7E835C",
  link: "https://wiki.vrcd.org.cn/",
}]

const getTitle = () => {
  const list = [
    "重庆火锅吃得屁股痛痛💨",
    "奶酪是天下第一美食！🧀",
    "什么时候才能盼到天亮🐀",
    "You Look Lonely👁👄👁",
    "我们有VRC最全的文档！",
    "Unity 报错不用怕。。呜",
    "一起...组一辈子乐队！🎸",
    "我是来结束乐队的！",
    "saki酱saki酱saki酱uwu",
    "小猫你可以吃抹茶芭菲",
    "我的C和弦怎么样～",
    "Linux全名为GNU/Linux",
    "virtual意为真实也为虚拟",
    "NullPointerException",
    "Upload failed!",
    "其实VRC有拟真画质地图",
    "子级的子级物体是什么？",
    "有人要来玩 Basis 吗～",
    "祥，移动",
    "为什么要演奏春日影？",
    "iprem",
    "我明明是来结束乐队的",
    "等待VRC出现RTX选项",
    "醒啦？RTX9090出来了",
    "睦子米没有错哦",
    "哇袄！！！！！！！！！",
  ]

  if (Math.random() <= 0.75) {
    return "虚拟现实中文开发者社区"
  }

  return list[Math.floor(Math.random() * list.length)]
}

const images = [
  {
    src: img5,
    alt: "Intro Image 5",
    from: "@超爽劲霸VRCD"
  },
  {
    src: img0,
    alt: "Intro Image 0",
    from: "@flower_elf"
  },
  {
    src: img2,
    alt: "Intro Image 2",
    from: "@风间苏苏"
  },
  {
    src: img7,
    alt: "Intro Image 7",
    from: "@酒保K"
  },
  {
    src: img6,
    alt: "Intro Image 6",
    from: "@COCOA_GAME"
  },
  {
    src: img8,
    alt: "Intro Image 8",
    from: "@巧克力蛋包饭"
  }
];

export default async function Home() {
  return (
    <div className="w-full min-h-[calc(100vh-120px)] mt-8 flex flex-col items-center p-8 bg-background">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-10">
        <div className="flex-5/6">
          <h1 className="text-4xl font-bold text-foreground mb-2">{getTitle()}</h1>
          <p className="text-muted-foreground mb-8">——酷酷的鼠鼠</p>

          {/* 搜索框 */}
          <form action="/search" className="w-full max-w-2xl flex gap-4 mb-12 p-2 rounded-xl dark:bg-[#202122] bg-[#F1F1F1]">
            <Input
              name="q"
              type="text"
              placeholder="如何用 Udon# 拉拖大的"
              className="flex-1"
            />
            <Button variant="default" type="submit">
              <Search className="h-4 w-4 mr-2" />
              搜索
            </Button>
          </form>
        </div>

        {/* 卡片网格 */}
        <div className="flex-1 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {apps.map((card, index) => (<AppCard key={index} {...card} />))}
        </div>
      </div>

      <div className="w-full max-w-6xl mt-16">
        <h1 className="text-4xl font-bold text-foreground mb-2">最近更新</h1>
        <Recently />
      </div>

      <div className="w-full max-w-6xl mt-16 md:flex-row gap-8">
        {/* <div className="flex-2/5 relative">
          <div className="max-h-[490px] overflow-y-scroll scrollbar-hide">
            <LeaderboardPage />
          </div>
          <div className={`absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-[var(--bg-1)] to-transparent`} />
        </div> */}
        <div className="flex flex-col mt-3 gap-4 rounded-xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">我们是谁？</h1>
          <div className="flex-col sm:flex-row gap-4 flex bg-[#F1F1F1] dark:bg-[#202122] p-6 rounded-xl shadow-lg">
            <Carousel
              images={images}
            />
            <div className="flex flex-col gap-4">
              <p>我们运营一个面向玩家，内容创作者与开发者的 中文VR创作社区⁄开源内容分享平台。</p>
              <p>为你的创作提供教程、汉化文档、官方资讯、社区帮助。</p>
              <p>我们定期运营⁄举办创作者活动。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
