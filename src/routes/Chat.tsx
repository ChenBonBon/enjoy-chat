import { Badge, Flex, Separator, TextField } from "@radix-ui/themes";
import { useLiveQuery } from "dexie-react-hooks";
import {
  ChangeEvent,
  CompositionEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import ChatContents, { IContent } from "../components/ChatContents";
import FileUpload from "../components/FileUpload";
import PictureIcon from "../components/Icon/Picture";
import UserCard from "../components/UserCard";
import { StatusMap } from "../constants";
import { db } from "../db";
import { addChatImage, addChatText } from "../requests/chat";

const currentUserId = Number(localStorage.getItem("userId"));

function getRandomTime(max: number) {
  return Math.floor(Math.random() * max);
}

export default function Chat() {
  const navigate = useNavigate();
  const compositionRef = useRef(false);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const chatId = Number(params.id);

  const chatContents = useLiveQuery(async () => {
    return await db.chatContents
      .where("chatId")
      .equals(chatId)
      .sortBy("createdAt");
  }, [chatId]);

  const myChatLikes = useLiveQuery(async () => {
    const chatContentIds = (chatContents ?? []).map(
      (chatContent) => chatContent.id!
    );
    return await db.chatLikes
      .where("chatContentId")
      .anyOf(chatContentIds)
      .and((item) => item.createdBy === currentUserId)
      .toArray();
  }, [chatContents]);

  const myChatDeletes = useLiveQuery(async () => {
    const chatContentIds = (chatContents ?? []).map(
      (chatContent) => chatContent.id!
    );
    return await db.chatDeletes
      .where("chatContentId")
      .anyOf(chatContentIds)
      .and((item) => item.createdBy === currentUserId)
      .toArray();
  }, [chatContents]);

  const chat = useLiveQuery(async () => {
    return await db.chats.where("id").equals(chatId).first();
  }, [chatId]);

  const user = useLiveQuery(async () => {
    if (chat) {
      const { from, to } = chat;
      const toQueryUserId = to === currentUserId ? from : to;
      return await db.users.where("id").equals(toQueryUserId).first();
    }
  }, [chat]);

  const [text, setText] = useState("");

  const [contents, setContents] = useState<IContent[]>([]);

  const selectPicture = useCallback(() => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  }, []);

  const send = useCallback(() => {
    addChatText(chatId, text, currentUserId);
    setText("");

    setTimeout(() => {
      if (user) {
        addChatText(chatId, text, Number(user.id));
      }
    }, getRandomTime(3000));
  }, [chatId, text, user]);

  const back = useCallback(() => {
    navigate(`/users/${currentUserId}/friends`);
  }, [navigate]);

  const handleCompositionStart = useCallback(() => {
    compositionRef.current = true;
  }, []);

  const handleCompositionEnd = useCallback(
    (event: CompositionEvent<HTMLInputElement>) => {
      compositionRef.current = false;
      const value = event.currentTarget.value;
      setText(value);
    },
    []
  );

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (compositionRef.current) return;
    const value = event.currentTarget.value;
    setText(value);
  }, []);

  const handleSelectPicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.files) {
        const file = event.currentTarget.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result && typeof reader.result === "string") {
            addChatImage(chatId, reader.result, currentUserId);
            setTimeout(() => {
              if (user) {
                addChatImage(chatId, text, Number(user.id));
              }
            }, getRandomTime(3000));
          }
        };
      }
    },
    [chatId, text, user]
  );

  useEffect(() => {
    const newContents: IContent[] = [];

    for (let i = 0; i < (chatContents ?? []).length; i++) {
      const chatContent = chatContents![i];
      const newContent: IContent = { ...chatContent };

      if (myChatLikes) {
        const like = myChatLikes.find(
          (item) => item.chatContentId === chatContent.id
        );
        if (like) {
          newContent.likeId = like.id!;
        }
      }

      if (myChatDeletes) {
        const deleteItem = myChatDeletes.find(
          (item) => item.chatContentId === chatContent.id
        );
        if (deleteItem) {
          continue;
        }
      }

      newContents.push(newContent);
    }

    setContents(newContents);
  }, [chatContents, myChatDeletes, myChatLikes]);

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
        <TextField.Root style={{ flex: 1 }}>
          <TextField.Input
            placeholder="请输入…"
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onChange={handleChange}
            value={text}
          />
          <TextField.Slot>
            <PictureIcon onClick={selectPicture} />
            <FileUpload
              ref={fileUploadRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleSelectPicture}
            />
          </TextField.Slot>
        </TextField.Root>
        <Button onClick={send}>发送</Button>
      </Flex>
    </div>
  );
}
