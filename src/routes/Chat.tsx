import { Badge, Flex, Separator } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import ChatContents from "../components/ChatContents";
import Input from "../components/Input";
import Picture from "../components/Picture";
import UserCard from "../components/UserCard";
import { StatusMap } from "../constants";
import useChat from "../hooks/useChat";
import useContents from "../hooks/useContents";
import { addChatImage, addChatText } from "../requests/chat";
import { getRandomTime } from "../utils";

export default function Chat() {
  const navigate = useNavigate();
  const params = useParams();
  const chatId = Number(params.id);
  const currentUserId = Number(localStorage.getItem("userId"));

  const [text, setText] = useState("");

  const { contents } = useContents(currentUserId, chatId);
  const { user } = useChat(currentUserId, chatId);

  function send() {
    if (text.length === 0) return;
    addChatText(chatId, text, currentUserId);
    setText("");

    setTimeout(() => {
      if (user) {
        addChatText(chatId, text, Number(user.id));
      }
    }, getRandomTime(3000));
  }

  function sendPicture(result: string | ArrayBuffer | null) {
    if (result && typeof result === "string") {
      addChatImage(chatId, result, currentUserId);
      setTimeout(() => {
        if (user) {
          addChatImage(chatId, result, user.id!);
        }
      }, getRandomTime(3000));
    }
  }

  function back() {
    navigate(`/users/${currentUserId}/friends`);
  }

  return (
    <div>
      <>
        <Button variant="ghost" onClick={back}>
          返回
        </Button>
        {user && (
          <>
            <Flex gap="5" align="center">
              <Badge color={StatusMap[user.status].color}>
                {StatusMap[user.status].label}
              </Badge>
              <UserCard
                name={user.name}
                description={user.description}
                avatar={user.avatar}
              />
            </Flex>
            <Separator my="3" size="4" />
          </>
        )}
      </>
      <ChatContents contents={contents} />
      <Flex gap="5" align="center" justify="between">
        <Input value={text} onChange={setText} onEnter={send}>
          <Picture
            chatId={chatId}
            userId={currentUserId}
            user={user}
            onChange={sendPicture}
          />
        </Input>
        <Button onClick={send}>发送</Button>
      </Flex>
    </div>
  );
}
