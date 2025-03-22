'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { UserProfile } from "./UserProfile";
import { BookStackStats } from "./BookStackStats";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ClientUserProfileProps {
  user: {
    uid: string;
    nickname: string;
    avatar: string;
    bio: string;
  };
  admin: boolean;
  customData: any;
  edit: boolean;
  id: string;
  stats: {
    booksCount: number;
    editedBooksCount: number;
    pagesCount: number;
    totalChars: number;
  };
  books: any[];
  editedBooks: any[]
  self: boolean;
}

export function ClientUserProfile({
  user,
  admin,
  customData,
  edit,
  id,
  stats,
  books,
  editedBooks,
  self,
}: ClientUserProfileProps) {
  const [name, setName] = useState(user.nickname);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const respose = await axios.post(`/api/user/edit`, {
        uid: user.uid,
        nickname: name,
        bio: bio,
        avatar: avatar,
      });

      if (respose.data.success) {
        toast("保存成功")
      } else {
        toast(`保存失败 (${respose.data.message})`)
      }
    } catch (error) {
      toast("保存失败: 网络错误")
    }

    setLoading(false);
  };

  return (
    <div className="container max-w-4xl mx-auto py-10">
      {admin && !self && (
        <div className="p-4">
          <p className="text-sm text-red-500 text-center">您正在作为管理员强制编辑用户信息，请谨慎操作</p>
        </div>
      )}
      <Card className="w-full">
        <UserProfile
          user={user}
          admin={admin}
          customData={customData}
          edit={edit}
          id={id}
          name={name}
          bio={bio}
          onNameChange={setName}
          onBioChange={setBio}
          onAvatarChange={setAvatar}
        />
        <Separator />
        <CardContent className="grid gap-6">
          <BookStackStats
            stats={stats}
            books={books}
            editedBooks={editedBooks}
          />
        </CardContent>
        {edit && (
          <>
            <Separator />
            <div className="flex justify-center py-2">
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={loading}
                className="w-40"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    保存中
                  </>
                ) : (
                  "保存"
                )}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}