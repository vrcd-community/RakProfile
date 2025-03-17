import { db } from "@/lib/db";
import { Logto } from '@/lib/external/Logto';

// 可调整的权重参数
const WEIGHTS = {
  RECENCY: 0.4,    // 时间衰减权重
  BOOK_COUNT: 0.6  // 书籍数量权重
};

export const getBookStackRank = async () => {
  // 获取所有书籍
  const books = await db.BookStack_Books.select('*');

  // 获取所有用户
  const users = await db.User.select('*');

  // 计算活跃度
  const now = new Date();
  const activityScores: Record<number, {
    score: number,
    lastUpdated: Date,
    booksCount: number,
    ownerId: number
  }> = {};

  // 为每本书计算活跃度分数并按所有者分组
  for (const book of books) {
    const updatedAt = new Date(book.updated_at);
    const daysDiff = Math.floor((now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));

    // 活跃度计算公式：基础分数 + 时间衰减因子
    // 最近更新的书籍获得更高分数
    const activityScore = 100 * Math.exp(-0.05 * daysDiff);

    if (!activityScores[book.owned_by]) {
      activityScores[book.owned_by] = {
        score: 0,
        lastUpdated: updatedAt,
        booksCount: 0,
        ownerId: book.owned_by
      };
    }

    activityScores[book.owned_by].score += activityScore;
    activityScores[book.owned_by].booksCount += 1;

    // 更新最近的更新时间
    if (updatedAt > activityScores[book.owned_by].lastUpdated) {
      activityScores[book.owned_by].lastUpdated = updatedAt;
    }
  }

  // 获取用户链接信息，将BookStack用户ID与Logto用户ID关联
  const userLinks = await db.UserLink.where('platform', 'bookstack').select('*');

  // 构建排名数据
  const activityRanking = await Promise.all(
    Object.values(activityScores).map(async (data) => {
      // 使用加权方式计算最终分数
      // 1. 时间衰减分数
      const recencyScore = data.score;
      
      // 2. 书籍数量分数 (使用对数函数使得边际效应递减)
      const bookCountScore = 100 * Math.log10(data.booksCount + 1) / Math.log10(11);
      
      // 3. 加权计算最终分数
      const finalScore = 
        WEIGHTS.RECENCY * recencyScore + 
        WEIGHTS.BOOK_COUNT * bookCountScore;
      
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
        rank: Math.round(finalScore), // 使用加权计算的最终分数
        uid: userData.logto_id,
        booksCount: data.booksCount,
        lastActive: data.lastUpdated
      };
    })
  );

  // 按活跃度分数降序排序
  return activityRanking.sort((a, b) => b.rank - a.rank).filter(rank => rank.name !== '未知用户');
};