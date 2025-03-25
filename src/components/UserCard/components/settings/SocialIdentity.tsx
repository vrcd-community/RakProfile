'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Github, Loader2, Unlink, Link2 } from "lucide-react";
import DiscordSVG from "@/assets/icons/Discord.svg";
import MicrosoftSVG from "@/assets/icons/Microsoft.svg";
import NextImage from "next/image";

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
    icon: <Github className="h-5 w-5" />,
    description: "使用 GitHub 账号登录"
  },
  "discord": {
    name: "Discord",
    icon: <NextImage src={DiscordSVG} alt="Discord" className="dark:invert-0 invert-100" width={20} height={20} />,
    description: "使用 Discord 账号登录"
  },
  "azuread": {
    name: "微软账号",
    icon: <NextImage src={MicrosoftSVG} alt="Microsoft" width={20} height={20} />,
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

  return (
    <>
      <div className="flex items-center space-x-2">
        <Link2 className="h-5 w-5" />
        <p className="text-lg font-medium">社交账号</p>
      </div>
      <p className="text-sm text-muted-foreground">
        绑定社交账号后，可以使用社交账号快速登录。
      </p>

      <div className="space-y-4 mt-4">
        {Object.entries(providerMap).map(([provider, { name, icon, description }]) => (
          <Card key={provider}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="font-medium">{name}</p>
                  {identities[provider] ? (
                    <p className="text-sm text-muted-foreground">
                      {identities[provider].details.email || identities[provider].details.name}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">{description}</p>
                  )}
                </div>
              </div>

              {identities[provider] ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={connectLoading === provider}>
                      {connectLoading === provider ? (
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
                      <AlertDialogTitle>确认解除绑定</AlertDialogTitle>
                      <AlertDialogDescription>
                        解除绑定后，将无法使用此社交账号登录。确定要继续吗？
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDisconnect(provider)}
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
                  disabled={connectLoading === provider}
                >
                  {connectLoading === provider ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Link2 className="h-4 w-4 mr-2" />
                      绑定
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
