
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export function EmptyState() {
  return (
    <Card className="border-dashed border-yellow-500/50 bg-yellow-500/10">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <AlertTriangle className="h-10 w-10 text-yellow-500 mb-3" />
        <h3 className="text-lg font-semibold text-yellow-600">未设置多因素认证</h3>
        <p className="text-sm text-yellow-700/80 mt-1">
          为了保护您的账户安全，我们强烈建议您至少添加一种认证方式。
        </p>
      </CardContent>
    </Card>
  );
}