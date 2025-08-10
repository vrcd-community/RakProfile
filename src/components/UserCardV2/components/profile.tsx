"use client";

import {CardHeader} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Head from "next/head";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Loader2} from "lucide-react";
import {useState} from "react";
import {toast} from "sonner";

interface Props {
  claims: any;
  edit: boolean;
}

const AvatarDisplay = ({claims, edit}: Props) => {
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast.error("请选择文件");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("只能上传图片");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("图片大小不能超过2MB");
      return;
    }

    setUploadLoading(true);
  };

  if (edit) {
    return (
      <div className="relative group">
        <Avatar className="h-22 w-22">
          <AvatarImage src={claims?.picture ?? ""} alt={claims?.picture ?? ""}/>
          <AvatarFallback>{claims?.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/50 rounded-full transition-opacity",
          uploadLoading ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          "cursor-pointer"
        )}>
          <label className="cursor-pointer w-full h-full flex items-center justify-center">
            <Input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarUpload}
              disabled={uploadLoading}
            />
            {uploadLoading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-6 w-6 text-white animate-spin"/>
                <span className="text-white text-xs mt-1">上传中...</span>
              </div>
            ) : (
              <span className="text-white text-sm">更换头像</span>
            )}
          </label>
        </div>
      </div>
    )
  }

  return (
    <Avatar className="h-22 w-22">
      <AvatarImage src={claims?.picture ?? ""} alt={claims?.picture ?? ""}/>
      <AvatarFallback>{claims?.name.substring(0, 2)}</AvatarFallback>
    </Avatar>
  )
}

export const Profile = ({claims, edit}: Props) => {
  return (
    <>
      <Head>
        <title>{claims?.name} - VRCD</title>
      </Head>
      <CardHeader className="flex flex-row items-center gap-4">
        <AvatarDisplay claims={claims} edit={edit}/>
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-2xl font-bold">{claims?.name}</h2>
        </div>
      </CardHeader>
    </>
  )
}