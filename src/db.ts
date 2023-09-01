import Dexie, { Table } from "dexie";

export interface User {
  id?: number;
  name: string;
  description?: string;
  avatar?: string;
  status: "online" | "offline";
}

export interface UserRelation {
  id?: number;
  from: number;
  to: number;
  createdAt: number;
}

export class DB extends Dexie {
  users!: Table<User>;
  userRelations!: Table<UserRelation>;

  constructor() {
    super("enjoy-chat");
    this.version(1).stores({
      users: "++id, name, status, description",
      userRelations: "++id, from, to, createdAt",
    });
  }
}

export const db = new DB();
