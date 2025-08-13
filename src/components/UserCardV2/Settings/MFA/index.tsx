'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Shield, Loader2 } from "lucide-react";
import { AddMFA } from "./AddMFA";
import { MFAOptionList } from "./MFAOptionList";
import { EmptyState } from "./EmptyState";
import { TOTPSetup } from "./TOTPSetup";
import { BackupCodeDisplay } from "./BackupCodeDisplay";
import { Separator } from "@/components/ui/separator";
import { Loading } from "@/components/common/loading";
import { Card } from "@/components/ui/card";

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
    <div className="space-y-4">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">多因素认证</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          通过增加一层安全验证，有效保护您的账户不被未授权访问。
        </p>
      </div>

      <Separator />

      {loading ? (
        <Loading />
      ) : (
        <>
          {mfaOptions.length > 0 ? (
            <MFAOptionList mfaOptions={mfaOptions} onMFADeleted={handleMFADeleted} />
          ) : (
            <EmptyState />
          )}

          <Separator />

          <AddMFA onMFAAdded={handleMFAAdded} />

          {mfaTOPT && <TOTPSetup mfaTOPT={mfaTOPT} onClose={() => setMfaTOPT(null)} />}
          {mfaBackupCode && <BackupCodeDisplay mfaBackupCode={mfaBackupCode} onClose={() => setMfaBackupCode(null)} />}
        </>
      )}
    </div>
  );
}