import { db } from "@/lib/db";
import { Logto } from '@/lib/external/Logto';

// 可调整的权重参数
const WEIGHTS = {
  RECENCY: 0.4,    // 时间衰减权重
  PAGE_COUNT: 0.6, // 页面数量权重
  PENALTY: 0.2     // 长期未更新惩罚权重
};

// 时间相关参数（单位：天）
const TIME_PARAMS = {
  PENALTY_THRESHOLD: 30,    // 超过这个天数开始计算惩罚
  MAX_PENALTY_DAYS: 365    // 惩罚计算的最大天数
};

export const getBookStackRank = async () => {
  const pages = await db.BookStack_Pages.select('*');
  const users = await db.User.select('*');
  const now = new Date();

  const activityScores: Record<number, {
    totalScore: number,     // 所有页面的活跃度总分
    penaltyScore: number,   // 长期未更新的惩罚分
    lastUpdated: Date,
    pagesCount: number,
    ownerId: number,
    updateTimes: Date[]     // 记录所有更新时间
  }> = {};

  // 为每个页面计算活跃度分数并按所有者分组
  for (const page of pages) {
    const updatedAt = new Date(page.updated_at);
    const daysDiff = Math.floor((now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));

    // 计算单个页面的活跃度分数
    const activityScore = 100 * Math.exp(-0.05 * daysDiff);

    // 计算惩罚分数
    let penaltyScore = 0;
    if (daysDiff > TIME_PARAMS.PENALTY_THRESHOLD) {
      const penaltyDays = Math.min(daysDiff - TIME_PARAMS.PENALTY_THRESHOLD, TIME_PARAMS.MAX_PENALTY_DAYS);
      penaltyScore = 50 * (penaltyDays / TIME_PARAMS.MAX_PENALTY_DAYS);
    }

    if (!activityScores[page.created_by]) {
      activityScores[page.created_by] = {
        totalScore: 0,
        penaltyScore: 0,
        lastUpdated: updatedAt,
        pagesCount: 0,
        ownerId: page.created_by,
        updateTimes: []
      };
    }

    activityScores[page.created_by].totalScore += activityScore;
    activityScores[page.created_by].penaltyScore += penaltyScore;
    activityScores[page.created_by].pagesCount += 1;
    activityScores[page.created_by].updateTimes.push(updatedAt);

    // 更新最近的更新时间
    if (updatedAt > activityScores[page.created_by].lastUpdated) {
      activityScores[page.created_by].lastUpdated = updatedAt;
    }
  }

  const userLinks = await db.UserLink.where('platform', 'bookstack').select('*');

  // 构建排名数据
  const activityRanking = await Promise.all(
    Object.values(activityScores).map(async (data) => {
      // 1. 计算时间衰减总分（考虑所有更新时间）
      const recencyScore = data.totalScore / data.pagesCount;
      
      // 2. 页面数量分数
      const pageCountScore = 100 * Math.log10(data.pagesCount + 1) / Math.log10(11);
      
      // 3. 计算平均惩罚分数
      const avgPenaltyScore = data.penaltyScore / data.pagesCount;
      
      // 4. 加权计算最终分数
      const finalScore = 
        WEIGHTS.RECENCY * recencyScore + 
        WEIGHTS.PAGE_COUNT * pageCountScore -
        WEIGHTS.PENALTY * avgPenaltyScore;
      
      // 查找对应的用户链接
      const userLink = userLinks.find(link => link.platform_id === data.ownerId.toString());
      let userData = { name: '未知用户', avatar: '', logto_id: '' };

      if (userLink) {
        // 查找用户信息
        const user = users.find(u => u.logto_id === userLink.logto_id);
        if (user) {
          userData = user;
        } else {
          // 尝试从Logto获取用户信息
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

      return {
        name: userData.name,
        avatar: userData.avatar,
        rank: +(Math.max(0, finalScore)).toFixed(0), // 确保分数不为负
        uid: userData.logto_id,
        pagesCount: data.pagesCount,
        lastActive: data.lastUpdated,
        penaltyScore: Math.round(avgPenaltyScore) // 添加惩罚分数显示
      };
    })
  );

  return activityRanking.sort((a, b) => b.rank - a.rank).filter(rank => rank.name !== '未知用户');
};