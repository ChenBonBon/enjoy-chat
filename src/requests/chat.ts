import { db } from '../db';

/**
 * 获取两个用户之间的聊天关系。
 *
 * @param {number} from - 发送者的用户ID。
 * @param {number} to - 接收者的用户ID。
 * @return {Chat | undefined} 聊天关系对象。
 */
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

/**
 * 添加两个用户之间的聊天。
 *
 * @param {number} from - 发起聊天的用户ID。
 * @param {number} to - 接收聊天的用户ID。
 * @return {Promise<number>} 创建的聊天的ID。
 */
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

/**
 * 向指定的聊天添加聊天文本。
 *
 * @param {number} chatId - 要添加文本的聊天的ID。
 * @param {string} text - 要添加到聊天的文本。
 * @param {number} createdBy - 创建聊天文本的用户的ID。
 */
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

/**
 * 添加聊天图片到指定聊天。
 *
 * @param {number} chatId - 要添加图片的聊天的ID。
 * @param {string} image - 要添加的图片的URL或路径。
 * @param {number} createdBy - 创建图片的用户的ID。
 */
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

/**
 * 向聊天内容添加点赞。
 *
 * @param {number} chatContentId - 聊天内容的ID。
 * @param {number} createdBy - 创建点赞的用户的ID。
 */
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

/**
 * 通过ID删除聊天点赞。
 *
 * @param {number} id - 要删除的聊天点赞的ID。
 * @return {Promise<void>} - 一个在成功删除聊天点赞时解析的Promise。
 */
export async function removeChatLike(id: number) {
  try {
    await db.chatLikes.delete(id);
  } catch (error) {
    console.error('RemoveChatLike error: ', error);
  }
}

/**
 * 移除指定ID的聊天内容。
 *
 * @param {number} id - 要移除的聊天内容的ID。
 * @return {Promise<void>} - 当聊天内容成功移除时解析的Promise。
 */
export async function removeChatContent(id: number) {
  try {
    await db.chatContents.delete(id);
  } catch (error) {
    console.error('RemoveChatContent error: ', error);
  }
}

/**
 * 向数据库中添加聊天删除记录。
 *
 * @param {number} chatContentId - 聊天内容的ID。
 * @param {number} createdBy - 创建聊天删除记录的用户的ID。
 */
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

/**
 * 从数据库中删除聊天删除记录。
 *
 * @param {number} id - 要删除的聊天删除记录的ID。
 * @return {Promise<void>} - 当聊天删除记录成功删除时解析的Promise。
 */
export async function removeChatDelete(id: number) {
  try {
    await db.chatDeletes.delete(id);
  } catch (error) {
    console.error('RemoveChatDelete error: ', error);
  }
}
