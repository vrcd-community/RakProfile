import VRCD_Outline from "@/assets/VRCD_Outline"
import NextImage from "next/image"

import VRChat from "@/assets/VRChat.svg"
import Bilibili from "@/assets/bilibili.svg"
import QQ from "@/assets/QQ.svg"
import Kook from "@/assets/KOOK.svg"
import Discord from "@/assets/Discord.svg"
import GitHub from "@/assets/github.svg"

export const Bottom = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 dark:bg-[#161718] bg-[#F9F9F9] lg:px-60 lg:py-30 w-full px-4 py-8 pb-24">
      <div className="flex flex-col items-center lg:items-start">
        <VRCD_Outline />
        <p className="dark:text-gray-400 text-gray-600 text-md text-center lg:text-left mt-8">
          &copy; 2023 VRCD. All rights reserved.
        </p>
      </div>
      <div className="flex flex-col items-center lg:items-end">
        <p className="dark:text-gray-400 text-gray-600 text-lg font-bold mb-4 text-right w-full">更多信息</p>
        <p className="dark:text-gray-400 text-gray-600 text-md text-right w-full">联系邮箱: us@vrcd.org.cn</p>
        <div className="flex flex-row gap-4 mt-4 justify-end w-full">
          <div className="p-2 dark:bg-[#454546] bg-[#CCC] rounded-sm">
            <NextImage className="dark:invert-0 invert-100" src={VRChat} alt="VRChat" width={20} height={20} />
          </div>
          <div className="p-2 dark:bg-[#454546] bg-[#CCC] rounded-sm">
            <NextImage className="dark:invert-0 invert-100"  src={Bilibili} alt="Bilibili" width={20} height={20} />
          </div>
          <div className="p-2 dark:bg-[#454546] bg-[#CCC] rounded-sm">
            <NextImage className="dark:invert-0 invert-100"  src={QQ} alt="QQ" width={18} height={18} />
          </div>
          <div className="p-2 dark:bg-[#454546] bg-[#CCC] rounded-sm">
            <NextImage className="dark:invert-0 invert-100"  src={Kook} alt="KOOK" width={20} height={20} />
          </div>
          <div className="p-2 dark:bg-[#454546] bg-[#CCC] rounded-sm">
            <NextImage className="dark:invert-0 invert-100"  src={Discord} alt="Discord" width={20} height={20} />
          </div>
          <div className="p-2 dark:bg-[#454546] bg-[#CCC] rounded-sm">
            <NextImage className="dark:invert-0 invert-100"  src={GitHub} alt="GitHub" width={20} height={20} />
          </div>
        </div>
        <div className="h-[1px] w-full max-w-[440px] bg-gray-600 mt-8 mb-4"></div>
        <div className="grid grid-cols-3 gap-4">
          <p className="dark:text-gray-400 text-gray-600 text-md text-right">用户协议</p>
          <p className="dark:text-gray-400 text-gray-600 text-md text-right">隐私协议</p>
          <p className="dark:text-gray-400 text-gray-600 text-md text-right">反馈建议</p>
        </div>
      </div> 
    </div>
  )
}