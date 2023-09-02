import { db } from "../db";

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
    console.error("AddFriend error: ", error);
  }
}

async function getRelation(from: number, to: number) {
  try {
    const relation = await db.userRelations
      .where(["from", "to"])
      .equals([from, to])
      .first();
    return relation;
  } catch (error) {
    console.error("GetFriend error: ", error);
  }
}

export async function removeRelation(from: number, to: number) {
  try {
    await db.userRelations.where(["from", "to"]).equals([from, to]).delete();
  } catch (error) {
    console.error("RemoveFriend error: ", error);
  }
}
