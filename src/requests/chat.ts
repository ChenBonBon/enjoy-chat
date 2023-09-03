import { db } from '../db';

async function getChat(from: number, to: number) {
  try {
    const relation = await db.chats
      .where(['from', 'to'])
      .equals([from, to])
      .first();
    return relation;
  } catch (error) {
    console.error('getChat error: ', error);
  }
}

export async function addChat(from: number, to: number) {
  const chat1 = await getChat(from, to);
  const chat2 = await getChat(to, from);

  if (chat1 || chat2) {
    return (chat1 ?? chat2)!.id;
  }

  try {
    const chatId = await db.chats.add({
      from,
      to,
      createdAt: Date.now(),
    });

    return chatId;
  } catch (error) {
    console.error('AddChat error: ', error);
  }
}

export async function addChatText(
  chatId: number,
  text: string,
  createdBy: number,
) {
  try {
    await db.chatContents.add({
      chatId,
      text,
      createdAt: Date.now(),
      createdBy,
    });
  } catch (error) {
    console.error('AddChatText error: ', error);
  }
}

export async function addChatImage(
  chatId: number,
  image: string,
  createdBy: number,
) {
  try {
    await db.chatContents.add({
      chatId,
      image,
      createdAt: Date.now(),
      createdBy,
    });
  } catch (error) {
    console.error('AddChatImage error: ', error);
  }
}

export async function addChatLike(chatContentId: number, createdBy: number) {
  try {
    await db.chatLikes.add({
      chatContentId,
      createdBy,
    });
  } catch (error) {
    console.error('AddChatLike error: ', error);
  }
}

export async function removeChatLike(id: number) {
  try {
    await db.chatLikes.delete(id);
  } catch (error) {
    console.error('RemoveChatLike error: ', error);
  }
}

export async function removeChatContent(id: number) {
  try {
    await db.chatContents.delete(id);
  } catch (error) {
    console.error('RemoveChatContent error: ', error);
  }
}

export async function addChatDelete(chatContentId: number, createdBy: number) {
  try {
    await db.chatDeletes.add({
      chatContentId,
      createdBy,
    });
  } catch (error) {
    console.error('AddChatDelete error: ', error);
  }
}

export async function removeChatDelete(id: number) {
  try {
    await db.chatDeletes.delete(id);
  } catch (error) {
    console.error('RemoveChatDelete error: ', error);
  }
}
