"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from 'next-themes';

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { toast, Toaster } from "sonner"

interface UserProfileProps {
  user: {
    nickname: string;
    avatar: string;
    bio: string;
  };
  id: string;
  edit: boolean;
}

export function UserProfile({ user, id, edit }: UserProfileProps) {
  const [name, setName] = useState(user.nickname);
  const [bio, setBio] = useState(user.bio);
  const [loading, setLoading] = useState(false);
  
  const { resolvedTheme } = useTheme();

  const handleSave = async () => {
    setLoading(true);
    try {
      const respose = await axios.post(`/api/user/edit`, {
        nickname: name,
        bio: bio,
      });

      if (respose.data.success) {
        toast("保存成功")
      } else {
        toast(`保存失败 (${respose.data.message})`)
      }
    } catch (error) {
      toast("保存失败: 网络错误")
    }

    setLoading(false);
  }

  return (
    <>
      <Toaster theme={resolvedTheme as any} />
      <CardHeader className="flex flex-col md:flex-row items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatar} alt="User avatar" />
          <AvatarFallback>{user.nickname.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center md:text-left">
          {
            edit ?
              <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2">
                <Input placeholder="用户昵称" className="max-w-[160px]" defaultValue={user.nickname} onChange={(e) => setName(e.target.value)} />
                <Button variant="outline" disabled={loading} onClick={handleSave}>
                  { loading && <Loader2 className="animate-spin"/> }
                  保存
                </Button>
              </div>
              :
              <CardTitle className="text-2xl">{user.nickname}</CardTitle>
          }
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-6">
        <div>
          <CardTitle className="text-lg">个性签名</CardTitle>
          <div className="mt-2">
            <div>
              <CardDescription>
                {
                  edit ?
                    <Textarea placeholder="写点什么呢..." className="w-full resize-none text-black dark:text-white" defaultValue={user.bio} onChange={(e) => setBio(e.target.value)} />
                    :
                    user.bio
                }
              </CardDescription>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}