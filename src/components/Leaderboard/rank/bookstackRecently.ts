import { db } from "@/lib/db";
import { Logto } from '@/lib/external/Logto';
import { User, UserLink } from "@/lib/db";

// 配置参数
const WEIGHTS = {
  RECENT_ACTIVITY: 0.6,    // 最近活动权重（30天内）
  TOTAL_CONTRIBUTION: 0.4  // 总贡献权重
};

const TIME_PARAMS = {
  RECENT_DAYS: 30,        // 最近活动的统计天数
  ACTIVE_THRESHOLD: 7     // 活跃判定阈值（天）
};

interface UserActivityData {
  recentPages: number;     // 最近30天的页面数
  recentChars: number;     // 最近30天的字数
  totalPages: number;      // 总页面数
  totalChars: number;      // 总字数
  lastActive: Date;        // 最后活动时间
  ownerId: number;
}

// 计算最近活跃度得分
const calculateRecentScore = (data: UserActivityData, now: Date) => {
  const daysSinceLastActive = Math.floor((now.getTime() - data.lastActive.getTime()) / (1000 * 60 * 60 * 24));
  const activeBonus = daysSinceLastActive <= TIME_PARAMS.ACTIVE_THRESHOLD ? 20 : 0;

  return (data.recentPages * 10 + data.recentChars / 1000) + activeBonus;
};

// 计算总贡献得分
const calculateTotalScore = (data: UserActivityData) => {
  return (data.totalPages * 5 + data.totalChars / 2000);
};

// 获取用户信息
const getUserData = async (ownerId: number, userLinks: UserLink[], users: User[]) => {
  const userLink = userLinks.find(link => link.platform_id === ownerId.toString());
  let userData = { name: '未知用户', avatar: '', logto_id: '' };

  if (userLink) {
    const user = users.find(u => u.logto_id === userLink.logto_id);
    if (user) {
      userData = user;
    } else {
      try {
        const logtoUser = await Logto.getUser(userLink.logto_id);
        userData = {
          name: logtoUser.name || '未知用户',
          avatar: logtoUser.avatar || '',
          logto_id: userLink.logto_id
        };
      } catch (_) { }
    }
  }
  return userData;
};

// 主函数
export const getBookStackRank = async () => {
  const [pages, users, userLinks] = await Promise.all([
    db.BookStack_Pages.select('*'),
    db.User.select('*'),
    db.UserLink.where('platform', 'bookstack').select('*')
  ]);

  const now = new Date();
  const recentDate = new Date(now.getTime() - TIME_PARAMS.RECENT_DAYS * 24 * 60 * 60 * 1000);
  const activityScores: Record<number, UserActivityData> = {};

  // 统计用户活动数据
  for (const page of pages) {
    const updatedAt = new Date(page.updated_at);
    const isRecent = updatedAt >= recentDate;

    if (!activityScores[page.created_by]) {
      activityScores[page.created_by] = {
        recentPages: 0,
        recentChars: 0,
        totalPages: 0,
        totalChars: 0,
        lastActive: updatedAt,
        ownerId: page.created_by
      };
    }

    const userData = activityScores[page.created_by];
    if (isRecent) {
      userData.recentPages += 1;
      userData.recentChars += page.chars || 0;
    }
    userData.totalPages += 1;
    userData.totalChars += page.chars || 0;
    userData.lastActive = updatedAt > userData.lastActive ? updatedAt : userData.lastActive;
  }

  // 构建排名数据
  const activityRanking = await Promise.all(
    Object.values(activityScores).map(async (data) => {
      const recentScore = calculateRecentScore(data, now);
      const totalScore = calculateTotalScore(data);
      const finalScore = WEIGHTS.RECENT_ACTIVITY * recentScore + WEIGHTS.TOTAL_CONTRIBUTION * totalScore;

      const userData = await getUserData(data.ownerId, userLinks, users);
      const daysSinceLastActive = Math.floor((now.getTime() - data.lastActive.getTime()) / (1000 * 60 * 60 * 24));

      return {
        name: userData.name,
        avatar: userData.avatar,
        rank: Math.round(finalScore),
        uid: userData.logto_id,
        recentPages: data.recentPages,
        recentChars: data.recentChars,
        totalPages: data.totalPages,
        totalChars: data.totalChars,
        lastActive: data.lastActive,
        isActive: daysSinceLastActive <= TIME_PARAMS.ACTIVE_THRESHOLD
      };
    })
  );

  return activityRanking
    .sort((a, b) => b.rank - a.rank)
    .filter(rank => rank.name !== '未知用户');
};