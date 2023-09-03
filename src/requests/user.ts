import { db } from "../db";

export async function addUser(
  name: string,
  description: string,
  avatar?: string
) {
  try {
    await db.users.add({
      name,
      description,
      avatar,
      status: "offline",
    });
  } catch (error) {
    console.error("AddUser error: ", error);
  }
}

export async function updateUser(id: number, status: "online" | "offline") {
  try {
    await db.users.update(id, { status });
  } catch (error) {
    console.error("UpdateUser error: ", error);
  }
}

export async function getUser(id: number) {
  return db.users.where("id").equals(id).first();
}
