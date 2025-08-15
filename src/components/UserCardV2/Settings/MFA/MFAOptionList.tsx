import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar, Shield, CheckCircle, Loader2 } from "lucide-react";
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
import { useState } from "react";

interface MFAOptionListProps {
  mfaOptions: MFAitem[];
  onMFADeleted: () => void;
}

export function MFAOptionList({ mfaOptions, onMFADeleted }: MFAOptionListProps) {
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const handleDeleteMFA = async (mfaId: string) => {
    try {
      setDeleteLoading(mfaId);
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
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
          <h2 className="text-lg font-semibold">已启用的认证方式</h2>
          <Badge variant="secondary" className="ml-2">
            {mfaOptions.length} 个
          </Badge>
        </div>
      </div>
      
      <div className="grid gap-4">
        {mfaOptions.map((item, index) => (
          <Card 
            key={item.id} 
            className="group transition-all duration-200 relative"
          >
            <CardContent className="py-2 px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 border-2 border-green-200/50 dark:border-green-700/50 group-hover:scale-105 transition-transform duration-200">
                      {typeMap[item.type].icon}
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{typeMap[item.type].name}</h3>
                      <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                        已激活
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>创建于 {new Date(item.createdAt).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}</span>
                      </div>
                      
                      {item.remainCodes !== undefined && (
                        <div className="flex items-center space-x-1">
                          <Badge 
                            variant={item.remainCodes > 5 ? "default" : item.remainCodes > 2 ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            剩余 {item.remainCodes} 个代码
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground max-w-md">
                      {typeMap[item.type].description}
                    </p>
                  </div>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center space-x-2">
                        <Trash2 className="h-5 w-5 text-destructive" />
                        <span>确定要删除这个认证方式吗？</span>
                      </AlertDialogTitle>
                      <AlertDialogDescription className="space-y-2">
                        <p>您即将删除 <strong>{typeMap[item.type].name}</strong>。</p>
                        <p className="font-bold">此操作无法撤销。</p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteMFA(item.id)}
                        className="bg-destructive hover:bg-destructive/90 focus:ring-destructive"
                      >
                        确认删除
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
            {deleteLoading === item.id && (
              <div className="absolute inset-0 top-0 left-0 flex items-center justify-center bg-black/50 z-10 rounded-lg">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}