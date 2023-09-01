import { Flex, Heading } from "@radix-ui/themes";
import { useLiveQuery } from "dexie-react-hooks";
import UserCard from "../components/UserCard";
import { db } from "../db";

export default function Users() {
  const users = useLiveQuery(() => db.users.toArray());

  return (
    <div>
      <Heading as="h1">用户列表</Heading>
      <Flex mt="5" direction="column" gap="3" align="center">
        {(users ?? []).map((user) => {
          return <UserCard key={user.id} {...user} />;
        })}
      </Flex>
    </div>
  );
}
