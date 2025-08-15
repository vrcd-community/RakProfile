
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Shield, AlertTriangle, Lock } from "lucide-react";

export function EmptyState() {
  return (
    <div className="space-y-4">
      <Card className="border-dashed border-2 border-amber-200 dark:border-amber-800/50 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/20 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-red-950/10">
        <CardContent className="p-2 flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 dark:from-amber-600/20 dark:to-orange-600/20 rounded-full blur-lg" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 border border-amber-200 dark:border-amber-700">
              <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200">
              未设置多因素认证
            </h3>
            <p className="text-sm text-amber-700/90 dark:text-amber-300/80 max-w-md">
              为了保护您的账户安全，我们强烈建议您至少添加一种认证方式。多因素认证可以有效防止未授权访问。
            </p>
          </div>
          
          <div className="flex items-center space-x-6 pt-2">
            <div className="flex items-center space-x-2 text-xs text-amber-600 dark:text-amber-400">
              <Shield className="h-4 w-4" />
              <span>增强安全性</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-amber-600 dark:text-amber-400">
              <Lock className="h-4 w-4" />
              <span>防止未授权访问</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}