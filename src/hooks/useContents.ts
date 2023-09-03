import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { IContent } from '../components/ChatContents';
import { db } from '../db';

/**
 * 检索给定用户和聊天的内容。
 *
 * @param {number} userId - 用户的ID。
 * @param {number} chatId - 聊天的ID。
 * @return {object} 包含检索到的内容的对象。
 */
export default function useContents(userId: number, chatId: number) {
  // 聊天内容列表
  const [contents, setContents] = useState<IContent[]>([]);

  // 获取聊天内容
  const chatContents = useLiveQuery(async () => {
    return await db.chatContents
      .where('chatId')
      .equals(chatId)
      .sortBy('createdAt');
  }, [chatId]);

  // 获取用户的聊天点赞
  const myChatLikes = useLiveQuery(async () => {
    const chatContentIds = (chatContents ?? []).map(
      (chatContent) => chatContent.id!,
    );
    return await db.chatLikes
      .where('chatContentId')
      .anyOf(chatContentIds)
      .and((item) => item.createdBy === userId)
      .toArray();
  }, [chatContents]);

  // 获取用户的聊天删除
  const myChatDeletes = useLiveQuery(async () => {
    const chatContentIds = (chatContents ?? []).map(
      (chatContent) => chatContent.id!,
    );
    return await db.chatDeletes
      .where('chatContentId')
      .anyOf(chatContentIds)
      .and((item) => item.createdBy === userId)
      .toArray();
  }, [chatContents]);

  // 向聊天内容中移除掉已删除掉聊天内容，并添加点赞信息
  useEffect(() => {
    const newContents: IContent[] = [];

    for (let i = 0; i < (chatContents ?? []).length; i++) {
      const chatContent = chatContents![i];
      const newContent: IContent = { ...chatContent };

      if (myChatLikes) {
        const like = myChatLikes.find(
          (item) => item.chatContentId === chatContent.id,
        );
        if (like) {
          newContent.likeId = like.id!;
        }
      }

      if (myChatDeletes) {
        const deleteItem = myChatDeletes.find(
          (item) => item.chatContentId === chatContent.id,
        );
        if (deleteItem) {
          continue;
        }
      }

      newContents.push(newContent);
    }

    setContents(newContents);
  }, [chatContents, myChatDeletes, myChatLikes]);

  return { contents };
}
