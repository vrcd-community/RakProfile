import { Smartphone, Fingerprint, Key } from "lucide-react";

export const typeMap: Record<string, {
  name: string;
  description: string;
  icon: React.ReactNode;
}> = {
  "Totp": {
    name: "验证器应用 (TOTP)",
    description: "使用 Google Authenticator, Authy 等应用生成动态验证码。",
    icon: <Smartphone className="h-5 w-5" />
  },
  // "WebAuthn": {
  //   name: "PassKey / 安全密钥",
  //   description: "使用指纹、面部识别或硬件密钥进行安全认证。",
  //   icon: <Fingerprint className="h-5 w-5" />
  // },
  "BackupCode": {
    name: "备用恢复代码",
    description: "生成一次性代码，用于在无法访问其他设备时恢复账户。",
    icon: <Key className="h-5 w-5" />
  }
};