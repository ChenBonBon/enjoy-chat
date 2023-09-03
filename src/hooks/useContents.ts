import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { IContent } from "../components/ChatContents";
import { db } from "../db";

export default function useContents(userId: number, chatId: number) {
  const [contents, setContents] = useState<IContent[]>([]);

  const chatContents = useLiveQuery(async () => {
    return await db.chatContents
      .where("chatId")
      .equals(chatId)
      .sortBy("createdAt");
  }, [chatId]);

  const myChatLikes = useLiveQuery(async () => {
    const chatContentIds = (chatContents ?? []).map(
      (chatContent) => chatContent.id!
    );
    return await db.chatLikes
      .where("chatContentId")
      .anyOf(chatContentIds)
      .and((item) => item.createdBy === userId)
      .toArray();
  }, [chatContents]);

  const myChatDeletes = useLiveQuery(async () => {
    const chatContentIds = (chatContents ?? []).map(
      (chatContent) => chatContent.id!
    );
    return await db.chatDeletes
      .where("chatContentId")
      .anyOf(chatContentIds)
      .and((item) => item.createdBy === userId)
      .toArray();
  }, [chatContents]);

  useEffect(() => {
    const newContents: IContent[] = [];

    for (let i = 0; i < (chatContents ?? []).length; i++) {
      const chatContent = chatContents![i];
      const newContent: IContent = { ...chatContent };

      if (myChatLikes) {
        const like = myChatLikes.find(
          (item) => item.chatContentId === chatContent.id
        );
        if (like) {
          newContent.likeId = like.id!;
        }
      }

      if (myChatDeletes) {
        const deleteItem = myChatDeletes.find(
          (item) => item.chatContentId === chatContent.id
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
