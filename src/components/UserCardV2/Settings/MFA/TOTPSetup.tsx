import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MFA_TOPT } from "./";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
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
    <Card className="mt-6 animate-fade-in">
      <CardHeader>
        <CardTitle>设置验证器应用</CardTitle>
        <CardDescription>
          请用验证器应用扫描下方二维码，或手动输入密钥。此信息仅显示一次，请在确认成功后再关闭。
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <img
          src={mfaTOPT.secretQrCode}
          alt="TOTP QR Code"
          className="w-48 h-48 rounded-lg shadow-lg transform transition-transform hover:scale-105"
        />
        <div className="flex items-center gap-2 p-1 rounded-md bg-background w-full justify-center">
          <p className="text-md font-mono">{mfaTOPT.secret}</p>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={onClose}>完成并关闭</Button>
      </CardFooter>
    </Card>
  );
}