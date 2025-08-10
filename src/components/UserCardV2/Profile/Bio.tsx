import {Markdown} from "@/components/markdown";
import {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Textarea} from "@/components/ui/textarea";
import {CheckCircle, CircleX, Loader2, PencilLine} from "lucide-react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

interface Props {
  edit: boolean,
  bio: string,
  claims: any
}

export const Bio = ({edit, bio: _bio, claims}: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [bio, setBio] = useState<string>(_bio);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancel = () => {
    setIsEdit(false);
    setBio(_bio);
  }

  const handleSave = () => {
    if (!bio) {
      toast.error("用户名不能为空");
      return;
    }

    setLoading(true);

    fetch("/api/user/edit", {
      method: "POST",
      body: JSON.stringify({
        bio: bio,
        uid: claims.sub
      })
    }).then(resp => {
      if (!resp.ok) {
        setLoading(false);
        setIsEdit(false);
        toast.error("数据更新失败: 网络错误");
        return;
      }

      return resp.json();
    }).then(json => {
      setLoading(false);
      setIsEdit(false);

      if (json.error) {
        toast.error(`数据更新失败: ${json.error}${json.detail ? ` (${json.detail})` : ""}`);
        return;
      }

      toast.success("更新成功");
    })
  }

  if (edit) {
    return (
      isEdit ? (
          <>
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-semibold">简介</h2>
              <div className="flex gap-2">
                <Button variant="default" onClick={() => handleCancel()}>
                  <CircleX className="w-4 h-4"/>
                  <span>取消</span>
                </Button>
                <Button variant="default" disabled={loading} onClick={() => handleSave()}>
                  {
                    loading ?
                      (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin"/>
                          <span>保存中...</span>
                        </>
                      ) :
                      (
                        <>
                          <CheckCircle className="w-4 h-4"/>
                          <span>保存</span>
                        </>
                      )
                  }
                </Button>
              </div>
            </div>
            <Tabs defaultValue="edit">
              <TabsList>
                <TabsTrigger value="edit">编辑</TabsTrigger>
                <TabsTrigger value="preview">预览</TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="写点什么呢..."
                  className="min-h-[200px]"
                />
              </TabsContent>
              <TabsContent value="preview">
                <Markdown content={bio}/>
              </TabsContent>
            </Tabs>
          </>
        ) :
        (
          <>
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-semibold">简介</h2>
              <PencilLine className="w-4 h-4 cursor-pointer" onClick={() => setIsEdit(true)}/>
            </div>
            <Markdown content={bio || _bio}/>
          </>
        )
    )
  }

  return (
    <>
      <h2 className="text-lg font-semibold">简介</h2>
      <Markdown content={bio || _bio}/>
    </>
  )
}