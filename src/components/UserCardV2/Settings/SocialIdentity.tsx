'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Github, Loader2, Unlink, Link2, CheckCircle, Users, AlertTriangle } from "lucide-react";
import DiscordSVG from "@/assets/icons/Discord.svg";
import MicrosoftSVG from "@/assets/icons/Microsoft.svg";
import NextImage from "next/image";
import { Loading } from "@/components/common/loading";

interface Identity {
  userId: string;
  details: {
    email?: string;
    name?: string;
    [key: string]: unknown;
  };
}

interface Identities {
  [key: string]: Identity;
}

const providerMap: Record<string, {
  name: string;
  icon: React.ReactNode;
  description: string;
}> = {
  "github": {
    name: "GitHub",
    icon: <Github className="h-6 w-6" />,
    description: "使用 GitHub 账号登录"
  },
  "discord": {
    name: "Discord",
    icon: <NextImage src={DiscordSVG} alt="Discord" className="dark:invert-0 invert-100" width={24} height={24} />,
    description: "使用 Discord 账号登录"
  },
  "azuread": {
    name: "微软账号",
    icon: <NextImage src={MicrosoftSVG} alt="Microsoft" width={24} height={24} />,
    description: "使用微软账号登录"
  }
};

export default function SocialIdentity() {
  const [identities, setIdentities] = useState<Identities>({});
  const [loading, setLoading] = useState(false);
  const [connectLoading, setConnectLoading] = useState<string | null>(null);

  const fetchIdentities = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/me/3rd');
      const data = await response.json();
      if (data.data?.identities) {
        setIdentities(data.data.identities);
      }
    } catch (error) {
      toast.error("获取社交账号信息失败");
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (provider: string) => {
    setConnectLoading(provider);
    try {
      const response = await fetch('/api/user/me/3rd/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider }),
      });
      const data = await response.json();
      
      if (data.authorizationUri) {
        window.location.href = data.authorizationUri;
      } else {
        toast.error(data.message || "连接失败");
      }
    } catch (error) {
      toast.error("网络错误，请重试");
    } finally {
      setConnectLoading(null);
    }
  };

  const handleDisconnect = async (provider: string) => {
    setConnectLoading(provider);
    try {
      const response = await fetch('/api/user/me/3rd/disconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider }),
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success("解绑成功");
        fetchIdentities();
      } else {
        toast.error(data.message || "解绑失败");
      }
    } catch (error) {
      toast.error("网络错误，请重试");
    } finally {
      setConnectLoading(null);
    }
  };

  useEffect(() => {
    fetchIdentities();
  }, []);

  const connectedCount = Object.keys(identities).length;
  const totalProviders = Object.keys(providerMap).length;

  return (
    <div className="space-y-6 mt-2">
      {/* 头部区域 */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-200/20 dark:border-green-800/20">
            {connectedCount > 0 ? (
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">社交账号</h2>
            <p className="text-sm text-muted-foreground">
              绑定社交账号后，可以使用社交账号快速登录
            </p>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loading />
        </div>
      ) : (
        <div className="space-y-6">
          {/* 状态概览 */}
          {connectedCount === 0 && (
            <Card className="border-dashed border-2 border-amber-200 dark:border-amber-800/50 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/20 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-red-950/10">
              <CardContent className="p-2 flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 dark:from-amber-600/20 dark:to-orange-600/20 rounded-full blur-lg" />
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 border border-amber-200 dark:border-amber-700">
                    <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200">
                    未绑定社交账号
                  </h3>
                  <p className="text-sm text-amber-700/90 dark:text-amber-300/80 max-w-md">
                    绑定社交账号可以让您更方便地登录，无需记住复杂密码。建议至少绑定一个社交账号。
                  </p>
                </div>
                
                <div className="flex items-center space-x-6 pt-2">
                  <div className="flex items-center space-x-2 text-xs text-amber-600 dark:text-amber-400">
                    <Link2 className="h-4 w-4" />
                    <span>快速登录</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-amber-600 dark:text-amber-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>安全便捷</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 社交账号列表 */}
          <div className="space-y-6">
            {connectedCount > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h2 className="text-lg font-semibold">已绑定账号</h2>
                  <Badge variant="secondary" className="ml-2">
                    {connectedCount} / {totalProviders}
                  </Badge>
                </div>
              </div>
            )}
            
            <div className="grid gap-4">
              {Object.entries(providerMap).map(([provider, { name, icon, description }]) => {
                const isConnected = !!identities[provider];
                const isLoading = connectLoading === provider;
                
                return (
                  <Card 
                    key={provider} 
                    className={`group transition-all duration-200 relative ${
                      isConnected 
                        ? 'bg-green-50 dark:bg-green-950/20 hover:border-green-200 dark:hover:border-green-700/50'
                        : 'hover:border-blue-200 dark:hover:border-blue-800'
                    }`}
                  >
                    <CardContent className="py-2 px-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className={`flex items-center justify-center w-14 h-14 rounded-xl border-2 group-hover:scale-105 transition-transform duration-200 ${
                              isConnected 
                                ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-700/50' 
                                : 'bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-700/50'
                            }`}>
                              {icon}
                            </div>
                            {isConnected && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-lg">{name}</h3>
                              {isConnected && (
                                <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                                  已连接
                                </Badge>
                              )}
                            </div>
                            
                            <div className="text-sm text-muted-foreground">
                              {isConnected ? (
                                <span className="font-medium">
                                  {identities[provider].details.email || identities[provider].details.name || '已绑定'}
                                </span>
                              ) : (
                                <span>{description}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {isConnected ? (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="default" 
                                size="sm" 
                                disabled={isLoading}
                                className="transition-colors duration-200 text-white bg-red-600 hover:bg-red-600"
                              >
                                {isLoading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <>
                                    <Unlink className="h-4 w-4 mr-2" />
                                    解除绑定
                                  </>
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center space-x-2">
                                  <Unlink className="h-5 w-5 text-destructive" />
                                  <span>确认解除绑定</span>
                                </AlertDialogTitle>
                                <AlertDialogDescription className="space-y-2">
                                  <p>您即将解除与 <strong>{name}</strong> 的绑定。</p>
                                  <p className="font-bold">解除绑定后，将无法使用此社交账号登录。</p>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>取消</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDisconnect(provider)}
                                  className="bg-destructive hover:bg-destructive/90 focus:ring-destructive"
                                >
                                  确认解除
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleConnect(provider)}
                            disabled={isLoading}
                            className="hover:bg-blue-50 dark:hover:bg-blue-950/50 border-blue-200 dark:border-blue-800"
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Link2 className="h-4 w-4 mr-2" />
                                绑定账号
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                    
                    {/* 加载遮罩 */}
                    {isLoading && (
                      <div className="absolute inset-0 top-0 left-0 flex items-center justify-center bg-black/50 z-10 rounded-lg">
                        <Loader2 className="h-5 w-5 animate-spin text-white" />
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
