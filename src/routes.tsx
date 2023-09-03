import { Chat, Friends, Users } from './routes/index';

export default [
  {
    key: 'users',
    path: '/',
    element: <Users />,
  },
  {
    key: 'friends',
    path: '/users/:id/friends',
    element: <Friends />,
  },
  {
    key: 'chat',
    path: '/chats/:id',
    element: <Chat />,
  },
];
