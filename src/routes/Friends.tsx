import { Flex, Heading } from "@radix-ui/themes";
import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import AddUserIcon from "../components/Icon/AddUser";
import MessageIcon from "../components/Icon/Message";
import UserCard from "../components/UserCard";
import useFriends from "../hooks/useFriends";
import useRecommend from "../hooks/useRecommend";
import { addChat } from "../requests/chat";
import { addRelation } from "../requests/relation";
import { updateUser } from "../requests/user";
import { blank } from "../utils";

export default function Friends() {
  const navigate = useNavigate();
  const params = useParams();
  const from = Number(params.id);

  const { friends, friendIds } = useFriends(from);
  const { recommendUsers } = useRecommend(from, friendIds);

  const getFriendActions = useCallback(
    (userId: number) => {
      return [
        {
          key: "message",
          label: "发送消息",
          icon: <MessageIcon onClick={blank} />,
          onClick: async () => {
            const chatId = await addChat(from, userId);

            if (chatId) {
              navigate(`/chats/${chatId}`);
            }
          },
        },
      ];
    },
    [from, navigate]
  );

  const getRecommendUserActions = useCallback(
    (userId: number) => {
      return [
        {
          key: "add",
          label: "添加好友",
          icon: <AddUserIcon onClick={blank} />,
          onClick: async () => {
            await addRelation(from, userId, Date.now());
          },
        },
      ];
    },
    [from]
  );

  const friendList = useMemo(() => {
    return (friends ?? []).map((user) => {
      return (
        <UserCard
          key={user.id}
          {...user}
          actions={getFriendActions(user.id!)}
        />
      );
    });
  }, [friends, getFriendActions]);

  const recommendUserList = useMemo(() => {
    return (recommendUsers ?? []).map((user) => {
      return (
        <UserCard
          key={user.id}
          {...user}
          actions={getRecommendUserActions(user.id!)}
        />
      );
    });
  }, [getRecommendUserActions, recommendUsers]);

  async function back() {
    window.localStorage.removeItem("userId");
    await updateUser(from, "offline");
    navigate(`/`);
  }

  return (
    <>
      <Button variant="ghost" onClick={back}>
        返回
      </Button>
      <div>
        <Heading as="h1">好友列表</Heading>
        <Flex mt="5" direction="column" gap="3" align="center">
          {friends && friends.length > 0 ? (
            friendList
          ) : (
            <p>暂无好友，快来看看为你推荐的人吧</p>
          )}
        </Flex>
      </div>
      <div>
        <Heading as="h1">推荐的人</Heading>
        <Flex mt="5" direction="column" gap="3" align="center">
          {recommendUserList}
        </Flex>
      </div>
    </>
  );
}
