'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Shield, Loader2, ShieldCheck } from "lucide-react";
import { AddMFA } from "./AddMFA";
import { MFAOptionList } from "./MFAOptionList";
import { EmptyState } from "./EmptyState";
import { TOTPSetup } from "./TOTPSetup";
import { BackupCodeDisplay } from "./BackupCodeDisplay";
import { Separator } from "@/components/ui/separator";
import { Loading } from "@/components/common/loading";
import { Card, CardContent } from "@/components/ui/card";

export interface MFAitem {
  id: string;
  type: string;
  createdAt: string;
  agent?: string;
  remainCodes?: number;
}

export interface MFA_TOPT {
  secret: string;
  secretQrCode: string;
  type: string;
}

export interface MFA_BACKUP_CODE {
  codes: string[];
  type: string;
}

export default function MFA() {
  const [mfaOptions, setMfaOptions] = useState<MFAitem[]>([]);
  const [loading, setLoading] = useState(true); // 初始加载状态
  const [mfaTOPT, setMfaTOPT] = useState<MFA_TOPT | null>(null);
  const [mfaBackupCode, setMfaBackupCode] = useState<MFA_BACKUP_CODE | null>(null);

  const fetchMFA = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/me/mfa');
      const data = await response.json();
      if (response.ok) {
        setMfaOptions(data.mfa);
      } else {
        toast.error(data.message || "获取 MFA 列表失败");
      }
    } catch (error) {
      toast.error("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const handleMFAAdded = (newMfa: MFA_TOPT | MFA_BACKUP_CODE) => {
    if (newMfa.type === "Totp") {
      setMfaTOPT(newMfa as MFA_TOPT);
    } else if (newMfa.type === "BackupCode") {
      setMfaBackupCode(newMfa as MFA_BACKUP_CODE);
    }
    fetchMFA();
  };

  const handleMFADeleted = () => {
    fetchMFA();
  };

  useEffect(() => {
    fetchMFA();
  }, []);

  return (
    <div className="space-y-6 mt-2">
      {/* 头部区域 */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-200/20 dark:border-blue-800/20">
            {mfaOptions.length > 0 ? (
              <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">多因素认证</h2>
            <p className="text-sm text-muted-foreground">
              通过增加一层安全验证，有效保护您的账户不被未授权访问
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
          {/* MFA选项列表或空状态 */}
          {mfaOptions.length > 0 ? (
            <MFAOptionList mfaOptions={mfaOptions} onMFADeleted={handleMFADeleted} />
          ) : (
            <EmptyState />
          )}

          <Separator className="my-6" />

          {/* 添加新的认证方式 */}
          <AddMFA onMFAAdded={handleMFAAdded} />

          {/* 设置对话框 */}
          {mfaTOPT && <TOTPSetup mfaTOPT={mfaTOPT} onClose={() => setMfaTOPT(null)} />}
          {mfaBackupCode && <BackupCodeDisplay mfaBackupCode={mfaBackupCode} onClose={() => setMfaBackupCode(null)} />}
        </div>
      )}
    </div>
  );
}