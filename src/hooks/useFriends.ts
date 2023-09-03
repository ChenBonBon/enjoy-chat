import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { db } from '../db';

/**
 * 为给定的用户ID生成一个钩子，用于检索朋友列表。
 *
 * @param {number} userId - 用户的ID。
 * @return {{ friends: User[], friendIds: number[] }} - 包含朋友列表和他们的ID的对象。
 */
export default function useFriends(userId: number) {
  // 好友列表
  const [friendIds, setFriendIds] = useState<number[]>([]);

  // 获取好友列表
  const relations = useLiveQuery(async () => {
    return db.userRelations.where('from').equals(userId).toArray();
  }, [userId]);

  // 根据好友 id 获取好友信息
  const friends = useLiveQuery(async () => {
    return db.users.where('id').anyOf(friendIds).toArray();
  }, [friendIds]);

  // 根据好友列表获取好友 id
  useEffect(() => {
    const friendIds = (relations ?? []).map((relation) => relation.to);
    setFriendIds(friendIds);
  }, [relations]);

  return { friends, friendIds };
}
