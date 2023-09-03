import Dexie, { Table } from 'dexie';

// 用户信息表结构
export interface User {
  id?: number;
  name: string;
  description?: string;
  avatar?: string;
  status: 'online' | 'offline';
}

// 用户关系表结构
export interface UserRelation {
  id?: number;
  from: number;
  to: number;
  createdAt: number;
}

// 聊天信息表结构
export interface Chat {
  id?: number;
  from: number;
  to: number;
  createdAt: number;
}

// 聊天内容表结构
export interface ChatContent {
  id?: number;
  chatId: number;
  text?: string;
  image?: string;
  createdAt: number;
  createdBy: number;
}

// 聊天点赞表结构
export interface ChatLike {
  id?: number;
  chatContentId: number;
  createdBy: number;
}

// 聊天删除表结构
export interface ChatDelete {
  id?: number;
  chatContentId: number;
  createdBy: number;
}

export class DB extends Dexie {
  users!: Table<User>;
  userRelations!: Table<UserRelation>;
  chats!: Table<Chat>;
  chatContents!: Table<ChatContent>;
  chatLikes!: Table<ChatLike>;
  chatDeletes!: Table<ChatDelete>;

  constructor() {
    super('enjoy-chat');
    this.version(1).stores({
      users: '++id, name, status',
      userRelations: '++id, from, to, [from+to]',
      chats: '++id, from, to, [from+to]',
      chatContents: '++id, chatId',
      chatLikes: '++id, chatContentId, createdBy, [chatContentId+createdBy]',
      chatDeletes: '++id, chatContentId, createdBy, [chatContentId+createdBy]',
    });
  }
}

export const db = new DB();
