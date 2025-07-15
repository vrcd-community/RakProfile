'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Key, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const passwordSchema = z.object({
  oldPassword: z.string().min(1, "请输入旧密码"),
  newPassword: z.string()
    .min(8, { error: "密码长度至少为8位" })
    .max(32, { error: "密码长度不能超过32位" })
    .regex(/[a-zA-Z]/, { error: "密码必须包含大小写字母" })
    .regex(/[0-9]/, { error: "密码必须包含数字" }),
  confirmPassword: z.string().min(1, { error: "请确认新密码" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  error: "两次输入的密码不一致",
  path: ["confirmPassword"],
});

export function ChangePassword() {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  const handlePasswordChange = (field: keyof typeof passwords) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswords(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleUpdatePassword = async () => {
    try {
      const validatedData = passwordSchema.parse(passwords);

      setUpdateLoading(true);
      const response = await fetch('/api/user/me/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          old_password: validatedData.oldPassword,
          password: validatedData.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("密码修改成功");
        setPasswords({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
      } else {
        toast.error(data.error || "密码修改失败");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.issues.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast.error("操作失败，请重试");
      }
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center">
        <Key className="mr-2 h-5 w-5" />
        修改密码
      </h3>
      <div className="space-y-4">
        {/* 旧密码输入框 */}
        <div className="space-y-2">
          <Label htmlFor="oldPassword" className="text-sm">
            当前密码
          </Label>
          <div className="relative">
            <Input
              id="oldPassword"
              type={showPasswords.old ? "text" : "password"}
              value={passwords.oldPassword}
              onChange={handlePasswordChange("oldPassword")}
              placeholder="输入当前密码"
              className={errors.oldPassword ? "border-red-500" : ""}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => togglePasswordVisibility("old")}
            >
              {showPasswords.old ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.oldPassword && (
            <p className="text-sm text-red-500">{errors.oldPassword}</p>
          )}
        </div>

        {/* 新密码输入框 */}
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-sm">
            新密码
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPasswords.new ? "text" : "password"}
              value={passwords.newPassword}
              onChange={handlePasswordChange("newPassword")}
              placeholder="输入新密码"
              className={errors.newPassword ? "border-red-500" : ""}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => togglePasswordVisibility("new")}
            >
              {showPasswords.new ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword}</p>
          )}
        </div>

        {/* 确认新密码输入框 */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm">
            确认新密码
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPasswords.confirm ? "text" : "password"}
              value={passwords.confirmPassword}
              onChange={handlePasswordChange("confirmPassword")}
              placeholder="再次输入新密码"
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => togglePasswordVisibility("confirm")}
            >
              {showPasswords.confirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <Button
          className="w-full"
          variant="secondary"
          disabled={updateLoading || !passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword}
          onClick={handleUpdatePassword}
        >
          {updateLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              更新中
            </>
          ) : (
            "更新密码"
          )}
        </Button>
      </div>
    </div>
  );
} 