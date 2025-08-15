import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MFA_BACKUP_CODE } from "./";
import { toast } from "sonner";
import { Download, Copy, Check, Shield, AlertTriangle, FileText, Key } from "lucide-react";
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
    <Card className="mt-8 border-2 border-amber-300 dark:border-amber-600 animate-in slide-in-from-bottom-4 duration-300">
      <CardHeader className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-500 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl font-bold bg-amber-600 bg-clip-text text-transparent">
            保存您的备份代码
          </CardTitle>
          <CardDescription className="mt-2 text-base">
            请将这些代码保存在安全的地方，当您无法访问验证器时可以使用它们登录
          </CardDescription>
        </div>
        <div className="flex items-center justify-center space-x-2 p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          <span className="text-sm text-red-700 dark:text-red-300 font-semibold">
            这些代码仅显示一次，请立即保存！
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold">备份代码</span>
              <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700">
                {mfaBackupCode.codes.length} 个
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                className="hover:bg-amber-50 dark:hover:bg-amber-950/50 border-amber-200 dark:border-amber-800"
              >
                {copied ? (
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                复制全部
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownload}
                className="hover:bg-amber-50 dark:hover:bg-amber-950/50 border-amber-200 dark:border-amber-800"
              >
                <Download className="mr-2 h-4 w-4" />
                下载文件
              </Button>
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-2 border-gray-200 dark:border-gray-700 shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {mfaBackupCode.codes.map((code, index) => (
                <div 
                  key={code} 
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="relative flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 font-mono text-base font-semibold text-amber-900 dark:text-amber-100 hover:shadow-md transition-all duration-200">
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-normal">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-center flex-1">{code}</span>
                    <div className="w-3 h-3 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="space-y-2 text-sm">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">使用说明</h4>
              <ul className="space-y-1 text-blue-700 dark:text-blue-300 list-disc list-inside">
                <li>每个代码只能使用一次</li>
                <li>在无法访问验证器时输入任意一个代码</li>
                <li>建议将代码保存在密码管理器或安全的地方</li>
                <li>可以打印出来放在安全的物理位置</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
        <div className="flex-1 text-sm text-muted-foreground">
          请确保已将这些代码保存在安全的地方后再关闭此对话框
        </div>
        <Button 
          onClick={onClose} 
          size="lg"
          className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          我已保存，关闭
        </Button>
      </CardFooter>
    </Card>
  );
}