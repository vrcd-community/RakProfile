import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { MFAitem } from "./";
import { typeMap } from "./constants";

interface MFAOptionListProps {
  mfaOptions: MFAitem[];
  onMFADeleted: () => void;
}

export function MFAOptionList({ mfaOptions, onMFADeleted }: MFAOptionListProps) {
  const handleDeleteMFA = async (mfaId: string) => {
    try {
      const response = await fetch('/api/user/me/mfa', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mfaId }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("MFA 删除成功");
        onMFADeleted();
      } else {
        toast.error(data.message || "删除 MFA 失败");
      }
    } catch (error) {
      toast.error("网络错误，请稍后重试");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">已启用的认证方式</h2>
      {mfaOptions.map((item) => (
        <Card key={item.id} className="transition-all hover:shadow-md">
          <CardContent className="flex items-center justify-between px-6 py-1">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary">
                {typeMap[item.type].icon}
              </div>
              <div>
                <p className="font-semibold">{typeMap[item.type].name}</p>
                <p className="text-sm text-muted-foreground">
                  创建于: {new Date(item.createdAt).toLocaleDateString()}
                </p>
                {item.remainCodes !== undefined && (
                  <p className="text-sm text-muted-foreground">
                    剩余代码: {item.remainCodes}
                  </p>
                )}
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确定要删除吗？</AlertDialogTitle>
                  <AlertDialogDescription>
                    删除此认证方式将降低您账户的安全性。此操作无法撤销。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteMFA(item.id)}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    确认删除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}