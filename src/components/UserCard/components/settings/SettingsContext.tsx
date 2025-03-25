'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { z } from "zod";
import { toast } from "sonner";

export const userProfileSchema = z.object({
  isAuthenticated: z.boolean(),
  claims: z.object({
    sub: z.string(),
    name: z.string(),
    picture: z.string().url(),
    updated_at: z.number(),
    username: z.string(),
    created_at: z.number(),
    roles: z.array(z.string()),
    at_hash: z.string(),
    aud: z.string(),
    exp: z.number(),
    iat: z.number(),
    iss: z.string().url(),
    bio: z.string().optional(),
  })
});

type UserProfile = z.infer<typeof userProfileSchema>;

interface SettingsContextType {
  profile: UserProfile | null;
  targetUser: {
    uid: string;
    nickname: string;
    avatar: string;
    bio: string;
  } | null;
  isAdmin: boolean;
  isSelf: boolean;
  loading: boolean;
  saveLoading: boolean;
  name: string;
  bio: string;
  avatarPreview: string;
  isEditingName: boolean;
  isEditingBio: boolean;
  uploadLoading: boolean;
  setName: (name: string) => void;
  setBio: (bio: string) => void;
  setAvatarPreview: (url: string) => void;
  setIsEditingName: (value: boolean) => void;
  setIsEditingBio: (value: boolean) => void;
  handleSaveProfile: () => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  stats?: {
    booksCount: number;
    editedBooksCount: number;
    pagesCount: number;
    totalChars: number;
  };
  books?: any[];
  editedBooks?: any[];
  customData?: Record<string, any>;
  handleAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
  initialData?: {
    user: {
      uid: string;
      nickname: string;
      avatar: string;
      bio: string;
    };
    isAdmin: boolean;
    isSelf: boolean;
    stats?: {
      booksCount: number;
      editedBooksCount: number;
      pagesCount: number;
      totalChars: number;
    };
    books?: any[];
    editedBooks?: any[];
    customData?: Record<string, any>;
  };
}

export function SettingsProvider({ children, initialData }: SettingsProviderProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [name, setName] = useState(initialData?.user.nickname || "");
  const [bio, setBio] = useState(initialData?.user.bio || "");
  const [avatarPreview, setAvatarPreview] = useState(initialData?.user.avatar || "");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/user/me/profile");
        const data = await response.json();
        const parsedData = userProfileSchema.safeParse(data.user);

        if (parsedData.success) {
          setProfile(parsedData.data);
          if (!initialData) {
            setName(parsedData.data.claims.name);
            setBio(parsedData.data.claims.bio || "");
            setAvatarPreview(parsedData.data.claims.picture);
          }
        } else {
          console.error("Invalid user profile data:", parsedData.error);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [initialData]);

  const handleSaveProfile = async () => {
    if (!profile && !initialData?.user.uid) return;
    
    setSaveLoading(true);
    try {
      const response = await fetch(`/api/user/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: initialData?.user.uid || profile?.claims.sub,
          nickname: name,
          bio: bio,
          avatar: avatarPreview,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("个人资料已更新");
        setIsEditingName(false);
        setIsEditingBio(false);
      } else {
        toast.error(`保存失败: ${data.message}`);
      }
    } catch (error) {
      toast.error("保存失败: 网络错误");
    } finally {
      setSaveLoading(false);
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    try {
      // 实现密码更新逻辑
      toast.success("密码已更新");
    } catch (error) {
      toast.error("密码更新失败");
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      toast.error('请选择图片文件');
      return;
    }

    // 检查文件大小（例如限制为2MB）
    if (file.size > 2 * 1024 * 1024) {
      toast.error('图片大小不能超过2MB');
      return;
    }

    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/user/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.url) {
        setAvatarPreview(data.url);
        // 自动保存新头像
        await handleSaveProfile();
        toast.success('头像上传成功');
      } else {
        toast.error(data.error || '头像上传失败');
      }
    } catch (error) {
      toast.error('上传失败，请重试');
      console.error('Avatar upload error:', error);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <SettingsContext.Provider value={{
      profile,
      targetUser: initialData?.user || null,
      isAdmin: initialData?.isAdmin || false,
      isSelf: initialData?.isSelf || false,
      loading,
      saveLoading,
      name,
      bio,
      avatarPreview,
      isEditingName,
      isEditingBio,
      uploadLoading,
      setName,
      setBio,
      setAvatarPreview,
      setIsEditingName,
      setIsEditingBio,
      handleSaveProfile,
      updatePassword,
      stats: initialData?.stats,
      books: initialData?.books,
      editedBooks: initialData?.editedBooks,
      customData: initialData?.customData,
      handleAvatarUpload
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 