import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

/**
 * 根据提供的用户ID和好友ID生成推荐用户列表。
 *
 * @param {number} userId - 用户的ID，用于生成推荐。
 * @param {number[]} friendIds - 用户的好友ID数组。
 * @return {Object} - 包含推荐用户列表的对象。
 */
export default function useRecommend(userId: number, friendIds: number[]) {
  // 获取推荐用户
  const recommendUsers = useLiveQuery(async () => {
    return db.users
      .where('id')
      .notEqual(userId)
      .and((item) => !friendIds.includes(item.id!))
      .limit(10 - (friendIds ?? []).length)
      .toArray();
  }, [friendIds]);

  return { recommendUsers };
}
