import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MFA_BACKUP_CODE } from "./MFA";
import { toast } from "sonner";
import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";

interface BackupCodeDisplayProps {
  mfaBackupCode: MFA_BACKUP_CODE;
  onClose: () => void;
}

export function BackupCodeDisplay({ mfaBackupCode, onClose }: BackupCodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  const codesString = mfaBackupCode.codes.join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(codesString);
    setCopied(true);
    toast.success("备份代码已复制到剪贴板");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([codesString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.info("已开始下载备份代码文件");
  };

  return (
    <Card className="mt-6 border-amber-500 border-2 animate-fade-in">
      <CardHeader>
        <CardTitle>保存您的备份代码</CardTitle>
        <CardDescription>
          请将这些代码保存在安全的地方。当您无法访问验证器时，可以使用它们登录。这些代码仅显示一次。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 p-4 bg-background rounded-lg">
          {mfaBackupCode.codes.map((code) => (
            <div key={code} className="text-center font-mono text-lg py-1 px-2 rounded-md bg-secondary">
              {code}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col md:flex-row gap-2 justify-between">
         <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy}>
                {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                复制
            </Button>
            <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                下载
            </Button>
         </div>
         <Button onClick={onClose}>我已保存，关闭</Button>
      </CardFooter>
    </Card>
  );
}