import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

export default function useChat(userId: number, chatId: number) {
  const chat = useLiveQuery(async () => {
    return await db.chats.where('id').equals(chatId).first();
  }, [chatId]);

  const user = useLiveQuery(async () => {
    if (chat) {
      const { from, to } = chat;
      const toQueryUserId = to === userId ? from : to;
      return await db.users.where('id').equals(toQueryUserId).first();
    }
  }, [chat]);

  return { user };
}
