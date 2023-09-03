import { Flex, Heading } from '@radix-ui/themes';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import Button from '../components/Button';
import { LoginUserCard } from '../components/LoginUserCard';
import { db } from '../db';
import { importUser } from '../utils.ts';

export default function Users() {
  // 查询用户
  const users = useLiveQuery(() => db.users.toArray());

  // 用户列表
  const userList = useMemo(() => {
    return (users ?? []).map((user) => {
      return <LoginUserCard key={user.id} {...user} />;
    });
  }, [users]);

  return (
    <div>
      <Heading as='h1'>用户列表</Heading>
      {(!users || users.length === 0) && (
        <Flex justify='end' align='center'>
          <Button onClick={importUser}>初始化用户</Button>
        </Flex>
      )}
      <Flex mt='5' direction='column' gap='3' align='center'>
        {userList}
      </Flex>
    </div>
  );
}
