import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
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
    <div className="ml-1">
      <h2 className="text-md font-semibold">添加新的认证方式</h2>
      <p className="text-sm text-muted-foreground mb-4">选择一种方式以增强账户安全。</p>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full md:w-[320px]">
            <SelectValue placeholder="选择认证方式..." />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(typeMap).map(([value, { name, description, icon }]) => (
              <SelectItem key={value} value={value}>
                <div className="flex items-center gap-3">
                  {icon}
                  <span>{name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleCreateMFA}
          disabled={isCreating || !selectedType}
          className="w-full md:w-auto"
        >
          {isCreating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          添加
        </Button>
      </div>
      {selectedType && (
        <div className="mt-4 text-sm text-muted-foreground p-4 bg-secondary rounded-lg">
          <p className="font-semibold">{typeMap[selectedType].name}</p>
          <p>{typeMap[selectedType].description}</p>
        </div>
      )}
    </div>
  );
}