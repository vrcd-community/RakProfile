"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTheme } from 'next-themes';
import dynamic from "next/dynamic";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import highlight from "rehype-highlight";
import { useSettings } from "./settings/SettingsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Pencil } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import "@/app/markdown.css";
import { cn } from "@/lib/utils";

export function UserProfile() {
  const {
    targetUser,
    isAdmin,
    isSelf,
    customData,
    isEditingName,
    setIsEditingName,
    name,
    setName,
    bio,
    isEditingBio,
    setIsEditingBio,
    setBio,
    avatarPreview,
    setAvatarPreview,
    handleSaveProfile,
    saveLoading,
    handleAvatarUpload,
    uploadLoading,
  } = useSettings();

  const { resolvedTheme } = useTheme();
  const CSSComponent = dynamic(() => import(`@/assets/markdown/${resolvedTheme}`), { ssr: false });

  if (!targetUser) return null;

  const canEdit = isAdmin || isSelf;

  return (
    <>
      <CSSComponent />
      <CardHeader className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative group">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarPreview} alt="User avatar" />
            <AvatarFallback>{targetUser.nickname.substring(0, 2)}</AvatarFallback>
          </Avatar>
          {canEdit && (
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
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                    <span className="text-white text-xs mt-1">上传中...</span>
                  </div>
                ) : (
                  <span className="text-white text-sm">更换头像</span>
                )}
              </label>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-row text-center md:text-left justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            {isEditingName ? (
              <Input
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                className="max-w-[200px]"
              />
            ) : (
              <CardTitle className="text-2xl">{name}</CardTitle>
            )}
            {canEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditingName(!isEditingName)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
          {(isEditingName || isEditingBio) && (
            <Button
              onClick={handleSaveProfile}
              disabled={saveLoading}
            >
              {saveLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中
                </>
              ) : "保存修改"}
            </Button>
          )}
        </div>
      </CardHeader>
      <Separator />
      {isAdmin && customData && (
        <>
          <CardContent className="grid gap-6">
            <div>
              <CardTitle className="text-lg">额外信息</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">注: 此板块仅管理员可见</CardDescription>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">AI审核意见</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">当前模型: Qwen/Qwen2.5-7B-Instruct</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md">
                    {customData['censor.bio'] ?
                      JSON.stringify(JSON.parse(customData['censor.bio']), null, 2) :
                      "[无数据]"
                    }
                  </pre>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          <Separator />
        </>
      )}
      <CardContent className="grid gap-6">
        <div>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">个人介绍</CardTitle>
            {canEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditingBio(!isEditingBio)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="mt-2">
            {isEditingBio ? (
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="mb-2">
                  <TabsTrigger value="edit">编辑</TabsTrigger>
                  <TabsTrigger value="preview">预览</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="写点什么呢..."
                    className="min-h-[200px]"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {bio.length > 500 ?
                      <span className="text-red-500">字数超过限制 ({bio.length}/500)</span> :
                      <span>字数: {bio.length}/500 (支持Markdown格式)</span>
                    }
                  </p>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="markdown-root min-h-[200px] border rounded-md p-4">
                    <Markdown remarkPlugins={[gfm]} rehypePlugins={[highlight]}>
                      {bio}
                    </Markdown>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="markdown-root">
                <Markdown remarkPlugins={[gfm]} rehypePlugins={[highlight]}>
                  {bio || "暂无个人介绍"}
                </Markdown>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </>
  );
}