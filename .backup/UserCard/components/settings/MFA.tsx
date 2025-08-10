'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Smartphone,
  Fingerprint,
  Key,
  Loader2,
  AlertTriangle,
  Plus,
  Trash2,
} from "lucide-react";
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

interface MFAitem {
  id: string;
  type: string;
  createdAt: string;
  agent?: string;
  remainCodes?: number;
}

interface MFA_TOPT {
  secret: string;
  secretQrCode: string;
  type: string;
}

interface MFA_BACKUP_CODE {
  codes: string[];
  type: string;
}

const typeMap: Record<string, {
  name: string;
  description: string;
  icon: React.ReactNode;
}> = {
  "Totp": {
    name: "TOTP",
    description: "TOTP 是一种基于时间的一次性密码认证方式，通过手机应用或密码管理器等APP生成动态密码",
    icon: <Smartphone className="h-5 w-5" />
  },
  // "WebAuthn": {
  //   name: "PassKey",
  //   description: "PassKey 是一种基于生物特征或硬件设备的认证方式，通过指纹、面部识别、硬件密钥等方式进行认证",
  //   icon: <Fingerprint className="h-5 w-5" />
  // },
  "BackupCode": {
    name: "备份代码",
    description: "备份代码是用于紧急情况的备用认证方式，当您无法使用其他认证方式时，可以使用备份代码进行认证",
    icon: <Key className="h-5 w-5" />
  }
};

export default function MFA() {
  const [mfaOptions, setMfaOptions] = useState<MFAitem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");

  const [mfaTOPT, setMfaTOPT] = useState<MFA_TOPT | null>(null);
  const [mfaBackupCode, setMfaBackupCode] = useState<MFA_BACKUP_CODE | null>(null);

  const fetchMFA = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/me/mfa');
      const data = await response.json();
      if (data.mfa) {
        setMfaOptions(data.mfa);
      } else {
        toast.error(data.message || "获取 MFA 失败");
      }
    } catch (error) {
      toast.error("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMFA = async () => {
    if (!selectedType) {
      toast.error("请选择 MFA 类型");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/user/me/mfa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: selectedType }),
      });

      const { mfa } = await response.json();

      if (mfa.type === "Totp") {
        setMfaTOPT(mfa);
      }

      if (mfa.type === "BackupCode") {
        setMfaBackupCode(mfa);
      }

      fetchMFA();
      if (mfa.message) {
        toast.error(mfa.message);
      } else {
        toast.success("添加成功");
      }
    } catch (error) {
      toast.error("网络错误，请重试");
    } finally {
      setLoading(false);
      setSelectedType("");
    }
  };

  const handleDeleteMFA = async (mfaId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/me/mfa', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mfaId }),
      });

      const data = await response.json();
      if (data.message === "删除成功") {
        toast.success("MFA 删除成功");
        fetchMFA();
      } else {
        toast.error(data.message || "删除 MFA 失败");
      }
    } catch (error) {
      toast.error("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMFA();
  }, []);

  return (
    <>
      <div className="flex items-center space-x-2">
        <Shield className="h-5 w-5" />
        <p className="text-lg font-medium">多因素认证</p>
      </div>
      <p className="text-sm text-muted-foreground">
        多因素认证是一种安全措施，可以防止您的账户被未经授权的访问。
      </p>

      {/* 现有 MFA 列表 */}
      <div className="space-y-4 mt-4">
        {mfaOptions.length > 0 ? (
          mfaOptions.map((item) => (
            <Card key={item.id} className="bg-secondary/50">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  {typeMap[item.type].icon}
                  <div>
                    <p className="font-medium">{typeMap[item.type].name}</p>
                    {item.agent && (
                      <p className="text-sm text-muted-foreground">
                        设备: {item.agent}
                      </p>
                    )}
                    {item.remainCodes !== undefined && (
                      <p className="text-sm text-muted-foreground">
                        剩余备份码: {item.remainCodes}
                      </p>
                    )}
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>确认删除</AlertDialogTitle>
                      <AlertDialogDescription>
                        您确定要删除这个多因素认证方式吗？这可能会降低您账户的安全性。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteMFA(item.id)}
                      >
                        确认删除
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-warning/10 border-warning">
            <CardContent className="flex items-center space-x-2 p-4">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <p className="text-sm text-warning">
                您尚未设置任何多因素认证方式，建议添加以提高账户安全性。
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 添加新的 MFA */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4">
        <Select
          value={selectedType}
          onValueChange={setSelectedType}
        >
          <SelectTrigger className="w-full md:w-[280px]">
            <SelectValue placeholder="选择认证方式">
              {selectedType && (
                <div className="flex items-center gap-4">
                  {typeMap[selectedType].icon}
                  <span>{typeMap[selectedType].name}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(typeMap).map(([value, { name, description, icon }]) => (
              <SelectItem
                key={value}
                value={value}
                className="focus:bg-accent"
              >
                <div className="flex flex-col gap-1.5 py-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary">
                      {icon}
                    </div>
                    <span className="font-medium">{name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-12">
                    {description}
                  </p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleCreateMFA}
          disabled={loading || !selectedType}
          className="w-full md:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              加载中...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              添加认证方式
            </>
          )}
        </Button>
      </div>

      {selectedType && !mfaTOPT && (
        <Card className="mt-4 bg-muted border-dashed">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary shrink-0">
                {typeMap[selectedType].icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">
                  {typeMap[selectedType].name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {typeMap[selectedType].description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {
        mfaTOPT && (
          <Card className="bg-muted mt-4">
            <CardHeader>
              <CardTitle>TOTP 验证</CardTitle>
              <CardDescription>请使用手机应用扫描以下二维码进行认证，或手动输入密钥。此信息只会显示一次，请妥善保存。</CardDescription>
            </CardHeader>
            <CardContent className="p-4 grid gap-4">
              <div className="flex justify-center">
                <img src={mfaTOPT.secretQrCode} alt="TOTP QR Code" className="w-64 h-64 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300" />
              </div>
              <div className="text-center mt-2">
                <p className="text-sm">
                  密钥：
                  <span className="text-white bg-black px-2 py-1 rounded-md">{mfaTOPT.secret}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        )
      }

      {
        mfaBackupCode && (
          <Card className="bg-muted mt-4">
            <CardHeader>
              <CardTitle>备份代码</CardTitle>
              <CardDescription>请妥善保存以下备份代码，当您无法使用其他认证方式时，可以使用备份代码进行认证。此信息只会显示一次，请妥善保存。</CardDescription>
            </CardHeader>
            <CardContent className="p-4 grid gap-4">
              <div className="grid grid-cols-2 gap-2">
                {mfaBackupCode.codes.map((code) => (
                  <span key={code} className="text-white bg-background px-2 py-1 rounded-md text-center font-mono">{code}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      }
    </>
  );
}
