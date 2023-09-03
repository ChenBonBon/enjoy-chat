import { Flex, Heading } from "@radix-ui/themes";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";
import Button from "../components/Button";
import { LoginUserCard } from "../components/LoginUserCard";
import { userList } from "../constants.ts";
import { db } from "../db";
import { addUser } from "../requests/user.ts";

function importUser() {
  Promise.all(
    userList.map((user) => addUser(user.name, user.description, user.avatar))
  );
}

export default function Users() {
  const users = useLiveQuery(() => db.users.toArray());

  const userList = useMemo(() => {
    return (users ?? []).map((user) => {
      return <LoginUserCard key={user.id} {...user} />;
    });
  }, [users]);

  return (
    <div>
      <Heading as="h1">用户列表</Heading>
      {(!users || users.length === 0) && (
        <Flex justify="end" align="center">
          <Button onClick={importUser}>初始化用户</Button>
        </Flex>
      )}
      <Flex mt="5" direction="column" gap="3" align="center">
        {userList}
      </Flex>
    </div>
  );
}
