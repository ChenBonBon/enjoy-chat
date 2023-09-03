import { db } from '../db';

/**
 * 将用户添加到数据库中。
 *
 * @param {string} name - 用户的名称。
 * @param {string} description - 用户的描述。
 * @param {string} [avatar] - 用户的头像（可选）。
 * @return {Promise<void>} - 当用户成功添加时解析的 Promise。
 */
export async function addUser(
  name: string,
  description: string,
  avatar?: string,
) {
  try {
    await db.users.add({
      name,
      description,
      avatar,
      status: 'offline',
    });
  } catch (error) {
    console.error('AddUser error: ', error);
  }
}

/**
 * 更新用户的状态。
 *
 * @param {number} id - 要更新的用户的ID。
 * @param {'online' | 'offline'} status - 用户的新状态。
 * @return {Promise<void>} - 一个在用户状态更新时解析的Promise。
 */
export async function updateUser(id: number, status: 'online' | 'offline') {
  try {
    await db.users.update(id, { status });
  } catch (error) {
    console.error('UpdateUser error: ', error);
  }
}

/**
 * 根据用户ID从数据库中检索用户。
 *
 * @param {number} id - 用户的ID。
 * @return {Promise<User>} 一个解析为用户对象的Promise。
 */
export async function getUser(id: number) {
  return db.users.where('id').equals(id).first();
}
