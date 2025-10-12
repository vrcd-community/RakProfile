import { MemberCardWithExpanded } from "./card";
import { fetchAccessToken } from "@/lib/external/Logto";
import { type UserResponse } from "@/lib/external/Logto";
import { Metadata } from "next";

interface MemberData {
  uid: string;
  user: UserResponse;
}

type MembersData = MemberData[];

export const metadata: Metadata = {
  title: "VRCD - 团队成员",
  description: "我们是一个刚刚起步的面向玩家，初高级开发者，内容创作者的共创开源社区，在这里，您可以找到一众优秀的 VR 内容创作者与热心好学的新兴创作力量。",
  openGraph: {
    title: "VRCD - 团队成员",
    description: "我们是一个刚刚起步的面向玩家，初高级开发者，内容创作者的共创开源社区，在这里，您可以找到一众优秀的 VR 内容创作者与热心好学的新兴创作力量。",
    type: "website"
  }
}

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function Members() {
  try {
    const members = await getMembers();

    const hasMembers = members.length > 0;

    if (!hasMembers) {
      return <EmptyState />;
    }

    return (
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map(({ user, uid }) => (
          <MemberCardWithExpanded key={uid} uid={uid} user={user} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error rendering members page:', error);
    return <ErrorState />;
  }
}

function EmptyState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-24 h-24 mb-4 rounded-full bg-muted flex items-center justify-center">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">暂无团队成员</h3>
        <p className="text-muted-foreground">
          团队成员信息正在加载中，请稍后再试。
        </p>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-24 h-24 mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">加载失败</h3>
        <p className="text-muted-foreground mb-4">
          无法加载团队成员信息。页面将在下次部署时自动更新。
        </p>
        <p className="text-sm text-muted-foreground">
          如果问题持续存在，请联系管理员。
        </p>
      </div>
    </div>
  );
}

async function getMembers(): Promise<MembersData> {
  // 团队成员配置
  const memberConfig = [
    // 风间苏苏
    'uttg5xhfjs4m',
    // 可可脂
    'm3ni5rpb8s1a',
    // 琉燐
    '6jnupp1zn786',
    // 欧阳大鸽子
    'ggyvjv3pttqs',
    // 澎澎
    'p0o4awi7xj32',
    // 巧克力蛋包饭
    'w7szj3prb71h',
    // 瑄
    '0wyv41xki33n',
    // Anteness
    'k7vte2da2mry',
    // Flower_elf
    'yk7em2a9yuk1',
    // Misaka_L
    'prk9g38gai6u',
    // WangQAQ
    '7gnhkb938m4q',
  ]

  try {
    const access_token = await fetchAccessToken();
    const users: MembersData = [];

    // 创建所有用户数据获取的Promise数组
    const userPromises: Promise<{ uid: string; user: UserResponse | null }>[] = [];

    for (const uid of memberConfig) {
      userPromises.push(fetchUserData(access_token, uid));
    }

    // 并发获取所有用户数据
    const results = await Promise.allSettled(userPromises);

    // 处理结果并组织数据结构
    for (const result of results) {
      if (result.status === 'fulfilled' && result.value.user) {
        const { uid, user } = result.value;

        users.push({ uid, user });
      } else if (result.status === 'rejected') {
        console.error('Failed to fetch user data:', result.reason);
      }
    }

    users.sort((a, b) => {
      const nameA = a.user.name || a.user.username || '';
      const nameB = b.user.name || b.user.username || '';
      return nameA.localeCompare(nameB);
    });

    return users;
  } catch (error) {
    console.error('Failed to fetch members:', error);
    return [];
  }
}

/**
 * 获取单个用户数据
 * 
 * @param accessToken - API访问令牌
 * @param uid - 用户ID
 * @returns Promise包装的用户数据
 */
async function fetchUserData(
  accessToken: string,
  uid: string
): Promise<{ uid: string; user: UserResponse | null }> {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`${process.env.LOGTO_BASEURL}/api/users/${uid}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          revalidate: 3600, // 1小时缓存
        },
        cache: "force-cache"
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const user: UserResponse = await response.json();

      // 验证必要的用户数据
      if (!user.name && !user.username) {
        console.warn(`User ${uid} has no name or username`);
      }

      return { uid, user };
    } catch (error) {
      lastError = error as Error;
      console.warn(`Attempt ${attempt}/${maxRetries} failed for user ${uid}:`, error);

      if (attempt < maxRetries) {
        // 指数退避重试
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  console.error(`Failed to fetch user ${uid} after ${maxRetries} attempts:`, lastError);
  return { uid, user: null };
}