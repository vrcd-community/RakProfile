"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from 'next-themes';
import dynamic from "next/dynamic";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm"
import highlight from "rehype-highlight"

import { toast, Toaster } from "sonner"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "@/app/markdown.css"

interface UserProfileProps {
  user: {
    uid: string;
    nickname: string;
    avatar: string;
    bio: string;
  };
  id: string;
  edit: boolean;
  customData: Record<string, any>;
  admin: boolean
}

export function UserProfile({ user, edit, customData, admin }: UserProfileProps) {
  console.log(`isAdmin: ${admin}, custom_data: ${customData}`)

  const [name, setName] = useState(user.nickname);
  const [bio, setBio] = useState(user.bio);
  const [loading, setLoading] = useState(false);

  const { resolvedTheme } = useTheme();

  const CSSComponent = dynamic(() => import(`@/assets/markdown/${resolvedTheme}`), { ssr: false })

  const handleSave = async () => {
    setLoading(true);
    try {
      const respose = await axios.post(`/api/user/edit`, {
        uid: user.uid,
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

  useEffect(() => {
    setBio(user.bio);
  }, [])

  return (
    <>
      <CSSComponent />
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
                  {loading && <Loader2 className="animate-spin" />}
                  保存
                </Button>
              </div>
              :
              <CardTitle className="text-2xl">{user.nickname}</CardTitle>
          }
        </div>
      </CardHeader>
      <Separator />
      {
        admin && (
          <>
            <CardContent className="grid gap-6">
              <div>
                <CardTitle className="text-lg">!!!Admin Only!!!</CardTitle>
                <div className="mt-2">
                  <Textarea defaultValue={JSON.stringify(JSON.parse(customData['censor.bio']), null, 2)} />
                </div>
              </div>
            </CardContent>
            <Separator />
          </>
        )
      }
      <CardContent className="grid gap-6">
        <div>
          <CardTitle className="text-lg">个人介绍</CardTitle>
          <div className="mt-2">
            <div>
              {
                edit ? (
                  <>
                    <Tabs defaultValue="edit" className="w-full">
                      <TabsList className="mb-2">
                        <TabsTrigger value="edit">编辑</TabsTrigger>
                        <TabsTrigger value="preview">预览</TabsTrigger>
                      </TabsList>
                      <TabsContent value="edit">
                        <Textarea
                          placeholder="写点什么呢..."
                          className="w-full resize-none text-black dark:text-white whitespace-pre-wrap break-all"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        <div className="markdown-root">
                          <Markdown remarkPlugins={[gfm]} rehypePlugins={[highlight]}>{bio}</Markdown>
                        </div>
                      </TabsContent>
                    </Tabs>
                    <p className="text-xs text-gray-500 mt-2">
                      {
                        (bio && bio.length || 0) > 500 ?
                          <span className="text-red-500">字数超过限制</span>
                          :
                          <span className="text-gray-500">字数: {bio.length}/500 (支持Markdown格式, 支持GFM)</span>
                      }
                    </p>
                  </>
                ) : (
                  <div className="markdown-root">
                    <Markdown remarkPlugins={[gfm]} rehypePlugins={[highlight]}>{bio}</Markdown>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}