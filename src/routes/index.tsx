import { lazy } from 'react';

// 用户列表
export const Users = lazy(() => import('./Users'));
// 好友列表
export const Friends = lazy(() => import('./Friends'));
// 聊天页面
export const Chat = lazy(() => import('./Chat'));
