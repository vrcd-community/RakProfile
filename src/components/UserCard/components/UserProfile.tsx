"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from 'next-themes';
import dynamic from "next/dynamic";

import { Loader2 } from "lucide-react";

import { useState } from "react";
import axios from "axios";

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
  admin: boolean;
  name: string;
  bio: string;
  onNameChange: (name: string) => void;
  onBioChange: (bio: string) => void;
  onAvatarChange: (avatar: string) => void;
}

export function UserProfile({ user, edit, customData, admin, name, bio, onNameChange, onBioChange, onAvatarChange }: UserProfileProps) {
  const { resolvedTheme } = useTheme();

  const CSSComponent = dynamic(() => import(`@/assets/markdown/${resolvedTheme}`), { ssr: false })

  const [uploading, setUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      toast.error('请上传图片文件');
      return;
    }

    // 检查文件大小（限制为2MB）
    if (file.size > 2 * 1024 * 1024) {
      toast.error('图片大小不能超过2MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/user/upload', formData);
      if (response.data.success) {
        const t = Date.now();
        setAvatarPreview(response.data.url + `?t=${t}`);
        onAvatarChange(response.data.url + `t=${t}`);
        toast.success('头像上传成功');
      }
    } catch (error) {
      toast.error('头像上传失败');
      console.error('Avatar upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <CSSComponent />
      <Toaster theme={resolvedTheme as any} />
      <CardHeader className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative group">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarPreview} alt="User avatar" />
            <AvatarFallback>{user.nickname.substring(0, 2)}</AvatarFallback>
          </Avatar>
          {edit && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
              <label className="cursor-pointer">
                <Input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                />
                {uploading ? (
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                ) : (
                  <span className="text-white text-sm">更换头像</span>
                )}
              </label>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-row text-center md:text-left justify-between items-center gap-4">
          {
            edit ?
              <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2">
                <Input placeholder="用户昵称" className="max-w-[160px]" defaultValue={user.nickname} onChange={(e) => onNameChange(e.target.value)} />
              </div>
              :
              <CardTitle className="text-2xl">{user.nickname}</CardTitle>
          }

          {
            admin && !edit && (
              <Button
                variant="default"
                onClick={() => {
                  window.location.href = window.location.href + "?edit=1"
                }}
              >编辑模式</Button>
            )
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
                  <Textarea defaultValue={customData['censor.bio'] ? JSON.stringify(JSON.parse(customData['censor.bio']), null, 2) : "[无数据]"} readOnly/>
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
                          onChange={(e) => onBioChange(e.target.value)}
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        <div className="markdown-root">
                          {/* @ts-ignore */}
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
                    {/* @ts-ignore */}
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