import { db } from '../db';

/**
 * 添加两个用户之间的关系。
 *
 * @param {number} from - 第一个用户的ID。
 * @param {number} to - 第二个用户的ID。
 * @param {number} createdAt - 关系的创建时间戳。
 * @return {void} 此函数没有返回值。
 */
export async function addRelation(from: number, to: number, createdAt: number) {
  try {
    const relation = await getRelation(from, to);
    if (relation) {
      return;
    }

    await db.userRelations.add({
      from,
      to,
      createdAt,
    });
  } catch (error) {
    console.error('AddFriend error: ', error);
  }
}

/**
 * 从数据库中获取两个用户之间的关系。
 *
 * @param {number} from - 第一个用户的ID。
 * @param {number} to - 第二个用户的ID。
 * @return {Promise<any>} 如果找到关系，则返回包含关系数据的Promise；如果未找到关系，则返回undefined。
 */
async function getRelation(from: number, to: number) {
  try {
    const relation = await db.userRelations
      .where(['from', 'to'])
      .equals([from, to])
      .first();
    return relation;
  } catch (error) {
    console.error('GetFriend error: ', error);
  }
}

/**
 * 移除两个用户之间的关系。
 *
 * @param {number} from - 第一个用户的ID。
 * @param {number} to - 第二个用户的ID。
 * @return {Promise<void>} - 一个在关系移除成功时解析的Promise。
 */
export async function removeRelation(from: number, to: number) {
  try {
    await db.userRelations.where(['from', 'to']).equals([from, to]).delete();
  } catch (error) {
    console.error('RemoveFriend error: ', error);
  }
}
