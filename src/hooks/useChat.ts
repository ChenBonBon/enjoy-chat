import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

/**
 * 生成一个自定义钩子，用于获取给定用户和聊天ID的聊天信息。
 *
 * @param {number} userId - 用户的ID。
 * @param {number} chatId - 聊天的ID。
 * @return {Object} 包含用户信息的对象。
 */
export default function useChat(userId: number, chatId: number) {
  // 获取指定聊天
  const chat = useLiveQuery(async () => {
    return await db.chats.where('id').equals(chatId).first();
  }, [chatId]);

  // 获取聊天好友信息
  const user = useLiveQuery(async () => {
    if (chat) {
      const { from, to } = chat;
      const toQueryUserId = to === userId ? from : to;
      return await db.users.where('id').equals(toQueryUserId).first();
    }
  }, [chat]);

  return { user };
}
