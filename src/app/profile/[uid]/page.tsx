import UserCardV2 from "@/components/UserCardV2";
import { Logto } from "@/lib/external/Logto";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ uid: string }> }): Promise<Metadata> {
  try {
    const { uid } = await params;
    const user = await Logto.getUser(uid);
    
    return {
      title: `${user.name} - VRCD 用户资料`,
      description: user.customData.bio as string || `${user.name} 的个人资料`,
      openGraph: {
        title: `${user.name} - VRCD 用户资料`,
        description: user.customData.bio as string || `${user.name} 的个人资料`,
        type: "profile",
      },
      icons: {
        icon: user.avatar
      }
    }
  } catch (error) {
    return {
      title: "VRCD - 用户资料",
      description: "用户资料",
      openGraph: {
        title: "VRCD - 用户资料",
        description: "用户资料",
        type: "profile",
      }
    }
  }
}

export default async function ProfilePage({ params }: any) {
  const { uid } = await params;
  return <UserCardV2 uid={uid} />;
}