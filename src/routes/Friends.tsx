import { Flex, Heading } from "@radix-ui/themes";
import { useLiveQuery } from "dexie-react-hooks";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddUserIcon from "../components/Icon/AddUser";
import MessageIcon from "../components/Icon/Message";
import UserCard from "../components/UserCard";
import { db } from "../db";
import { addChat } from "../requests/chat";
import { addRelation } from "../requests/relation";

export default function Friends() {
  const navigate = useNavigate();
  const params = useParams();
  const from = Number(params.id);

  const [friendIds, setFriendIds] = useState<number[]>([]);

  const relations = useLiveQuery(async () => {
    return db.userRelations.where("from").equals(from).toArray();
  }, [from]);

  const friends = useLiveQuery(async () => {
    return db.users.where("id").anyOf(friendIds).toArray();
  }, [friendIds]);

  const users = useLiveQuery(async () => {
    return db.users
      .where("id")
      .notEqual(from)
      .and((item) => !friendIds.includes(item.id!))
      .limit(10 - (friendIds ?? []).length)
      .toArray();
  }, [friendIds]);

  const addFriend = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.dataset.id;
      addRelation(from, Number(id!), Date.now());
    },
    [from]
  );

  const chat = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.dataset.id;
      const chatId = await addChat(from, Number(id!));

      if (chatId) {
        navigate(`/chats/${chatId}`);
      }
    },
    [from, navigate]
  );

  useEffect(() => {
    const friendIds = (relations ?? []).map((relation) => relation.to);
    setFriendIds(friendIds);
  }, [relations]);

  return (
    <div>
      <div>
        <Heading as="h1">好友列表</Heading>
        <Flex mt="5" direction="column" gap="3" align="center">
          {friends && friends.length > 0 ? (
            friends.map((user) => {
              return (
                <UserCard
                  key={user.id}
                  {...user}
                  actions={[
                    {
                      key: "message",
                      label: "发送消息",
                      icon: <MessageIcon onClick={() => {}} />,
                      onClick: chat,
                    },
                  ]}
                />
              );
            })
          ) : (
            <p>暂无好友，快来看看为你推荐的人吧</p>
          )}
        </Flex>
      </div>
      <div>
        <Heading as="h1">推荐的人</Heading>
        <Flex mt="5" direction="column" gap="3" align="center">
          {(users ?? []).map((user) => {
            return (
              <UserCard
                key={user.id}
                {...user}
                actions={[
                  {
                    key: "add",
                    label: "添加好友",
                    icon: <AddUserIcon onClick={() => {}} />,
                    onClick: addFriend,
                  },
                ]}
              />
            );
          })}
        </Flex>
      </div>
    </div>
  );
}
