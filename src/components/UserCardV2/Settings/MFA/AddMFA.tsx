import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { typeMap } from "./constants";
import { MFA_TOPT, MFA_BACKUP_CODE } from "./";

interface AddMFAProps {
  onMFAAdded: (newMfa: MFA_TOPT | MFA_BACKUP_CODE) => void;
}

export function AddMFA({ onMFAAdded }: AddMFAProps) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateMFA = async () => {
    if (!selectedType) {
      toast.error("请先选择一种认证方式");
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch('/api/user/me/mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selectedType }),
      });

      const { mfa, message } = await response.json();

      if (response.ok) {
        if (mfa.message) {
          toast.error(mfa.message);
          return;
        }

        onMFAAdded(mfa);
        setSelectedType("");
      } else {
        toast.error(message || "添加失败");
      }
    } catch (error) {
      toast.error("网络错误，请稍后重试");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-200/50 dark:border-blue-800/50">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span>添加新的认证方式</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1 ml-1">
          选择一种方式以增强账户安全，保护您的重要数据不被未授权访问。
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-4">
          <div className="flex-1 space-y-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full h-12 border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <SelectValue placeholder="选择认证方式...">
                  {selectedType ? (
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-secondary">
                        {typeMap[selectedType]?.icon}
                      </div>
                      <div className="font-medium">{typeMap[selectedType]?.name}</div>
                    </div>
                  ) : null}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(typeMap).map(([value, { name, description, icon }]) => (
                  <SelectItem key={value} value={value} className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-secondary">
                        {icon}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{name}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {description.split('。')[0]}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleCreateMFA}
            disabled={isCreating || !selectedType}
            className="px-6 h-9 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            size="sm"
          >
            {isCreating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            添加认证方式
          </Button>
        </div>

        {selectedType && (
          <div className="mt-6 p-4 rounded-lg border border-blue-200/50 dark:border-blue-800/50 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-200 dark:bg-blue-800 border border-blue-300/50 dark:border-blue-700/50">
                {typeMap[selectedType].icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  {typeMap[selectedType].name}
                </h4>
                <p className="text-sm text-blue-700/80 dark:text-blue-300/80 leading-relaxed">
                  {typeMap[selectedType].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}