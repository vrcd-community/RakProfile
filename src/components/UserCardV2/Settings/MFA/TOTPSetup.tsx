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
import { MFA_TOPT } from "./";
import { toast } from "sonner";
import { Copy, Check, Smartphone, QrCode, Key, AlertCircle } from "lucide-react";
import { useState } from "react";

interface TOTPSetupProps {
  mfaTOPT: MFA_TOPT;
  onClose: () => void;
}

export function TOTPSetup({ mfaTOPT, onClose }: TOTPSetupProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(mfaTOPT.secret);
    setCopied(true);
    toast.success("密钥已复制到剪贴板");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="mt-8 border-2 border-blue-200 dark:border-blue-800 animate-in slide-in-from-bottom-4 duration-300">
      <CardHeader className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 shadow-lg">
            <Smartphone className="h-8 w-8 text-white" />
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl font-bold bg-blue-600 bg-clip-text text-transparent">
            设置验证器应用
          </CardTitle>
          <CardDescription className="mt-2 text-base">
            请用验证器应用扫描下方二维码，或手动输入密钥
          </CardDescription>
        </div>
        <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span className="text-sm text-amber-700 dark:text-amber-300 font-medium">
            此信息仅显示一次，请在确认成功后再关闭
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-500 hover:bg-blue-600">#1</Badge>
              <span className="font-medium">扫描二维码</span>
            </div>
            <div className="flex justify-center">
              <div className="relative group">
                <div className="relative p-4 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
                  <img
                    src={mfaTOPT.secretQrCode}
                    alt="TOTP QR Code"
                    className="w-40 h-40 rounded-lg"
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              使用 Google Authenticator、Authy 等应用扫描
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge className="bg-purple-500 hover:bg-purple-600">#2</Badge>
              <span className="font-medium">或手动输入密钥</span>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-muted-foreground">密钥</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCopy}
                    className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="mt-2 text-sm font-mono bg-white dark:bg-gray-800 p-2 rounded border break-all">
                  {mfaTOPT.secret}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                在验证器应用中选择"手动输入"，然后输入上方密钥
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-6 border-t">
        <div className="text-sm text-muted-foreground">
          设置完成后，验证器将每30秒生成一个新的验证码
        </div>
        <Button 
          onClick={onClose} 
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          完成设置
        </Button>
      </CardFooter>
    </Card>
  );
}