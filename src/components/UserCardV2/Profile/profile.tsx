"use client";

import {CardHeader} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Head from "next/head";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Loader2, PencilLine} from "lucide-react";
import {useState} from "react";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";

interface Props {
  claims: any;
  edit: boolean;
}

interface UploadResponse {
  error?: string;
  data?: {
    url: string
  }
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

    const formData = new FormData();

    formData.append("file", file);
    formData.append("uid", claims.sub);

    const resp = await fetch("/api/user/upload", {
      method: "POST",
      body: formData
    });

    if (!resp.ok) {
      toast.error("头像上传失败: 网络错误");
      setUploadLoading(false);
      return;
    }

    const json = await resp.json() as UploadResponse;

    if (json.error) {
      toast.error(`头像上传失败: ${json.error}`);
      return;
    }

    fetch("/api/user/edit", {
      method: "POST",
      body: JSON.stringify({
        avatar: json.data!.url,
        uid: claims.sub
      })
    }).then(resp => {
      if (!resp.ok) {
        toast.error("数据更新失败: 网络错误");
        return;
      }

      return resp.json();
    }).then(json => {
      if (json.error) {
        toast.error(`数据更新失败: ${json.error}${json.detail ? ` (${json.detail})` : ""}`);
        return;
      }

      toast.success("数据更新成功");
      window.location.reload();
    })
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

const UsernameDisplay = ({claims, edit}: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = () => {
    if (!username) {
      toast.error("用户名不能为空");
      return;
    }

    setLoading(true);

    fetch("/api/user/edit", {
      method: "POST",
      body: JSON.stringify({
        nickname: username,
        uid: claims.sub
      })
    }).then(resp => {
      if (!resp.ok) {
        setLoading(false);
        setIsEdit(false);
        toast.error("数据更新失败: 网络错误");
        return;
      }

      return resp.json();
    }).then(json => {
      setLoading(false);
      setIsEdit(false);

      if (json.error) {
        toast.error(`数据更新失败: ${json.error}${json.detail ? ` (${json.detail})` : ""}`);
        return;
      }

      toast.success("更新成功");
    })
  }

  if (edit) {
    return (
      <div className="flex flex-row items-center gap-1">
        {
          isEdit ?
            <>
              <Input value={username || claims?.name} onChange={e => setUsername(e.target.value)}/>
              <Button variant="default" onClick={() => handleUsernameChange()} className="ml-2" disabled={loading}>
                {
                  loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin"/>
                      <span>保存中...</span>
                    </>
                  ) : (
                    "保存"
                  )
                }
              </Button>
            </> :
            <>
              <h2 className="text-2xl font-bold">{username || claims?.name}</h2>
              <PencilLine className="w-4 h-4 cursor-pointer ml-2" onClick={() => setIsEdit(true)}/>
            </>
        }
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <h2 className="text-2xl font-bold">{claims?.name}</h2>
    </div>
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
        <UsernameDisplay claims={claims} edit={edit}/>
      </CardHeader>
    </>
  )
}