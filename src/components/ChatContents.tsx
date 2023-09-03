import { ContextMenu, Flex, ScrollArea } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import MessageCard from "../components/MessageCard";
import { ChatContent } from "../db";
import useWindowSize from "../hooks/useWindowSize";
import {
  addChatDelete,
  addChatLike,
  removeChatContent,
  removeChatLike,
} from "../requests/chat";
import { getCanRevoke, scrollToBottomObserverCallback } from "../utils";
import ImageCard from "./ImageCard";

export interface IContent extends ChatContent {
  likeId?: number;
}

interface IChatContents {
  contents?: IContent[];
}

const observer = new MutationObserver(scrollToBottomObserverCallback);

function revoke(id: number) {
  removeChatContent(id);
}

export default function ChatContents(props: IChatContents) {
  const currentUserId = Number(localStorage.getItem("userId"));
  const chatContentRef = useRef<HTMLDivElement>(null);

  const { windowSize } = useWindowSize();

  function deleteMessage(contentId: number) {
    addChatDelete(Number(contentId), currentUserId);
  }

  function toggleLike(contentId: number, id?: number) {
    if (id) {
      removeChatLike(Number(id));
    } else {
      addChatLike(Number(contentId), currentUserId);
    }
  }

  useEffect(() => {
    if (chatContentRef.current) {
      observer.observe(chatContentRef.current, { childList: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ScrollArea
      scrollbars="vertical"
      style={{ height: windowSize.height - 72 - 64 - 25 - 32 }}
    >
      <Flex direction="column" gap="5" px="5" py="4" ref={chatContentRef}>
        {(props.contents ?? []).map((chatContent) => (
          <ContextMenu.Root key={chatContent.id}>
            <ContextMenu.Trigger>
              <div>
                {chatContent.text && (
                  <MessageCard
                    {...chatContent}
                    text={chatContent.text}
                    myMessage={chatContent.createdBy === currentUserId}
                  />
                )}
                {chatContent.image && (
                  <ImageCard
                    {...chatContent}
                    image={chatContent.image}
                    myMessage={chatContent.createdBy === currentUserId}
                  />
                )}
              </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Item
                onClick={() => {
                  toggleLike(chatContent.id!, chatContent.likeId);
                }}
              >
                {chatContent.likeId ? "取消点赞" : "点赞"}
              </ContextMenu.Item>
              <ContextMenu.Separator />
              {getCanRevoke(chatContent.createdAt) &&
                chatContent.createdBy === currentUserId && (
                  <ContextMenu.Item
                    onClick={() => {
                      revoke(chatContent.id!);
                    }}
                  >
                    撤回
                  </ContextMenu.Item>
                )}
              <ContextMenu.Item
                onClick={() => {
                  deleteMessage(chatContent.id!);
                }}
              >
                删除
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        ))}
      </Flex>
    </ScrollArea>
  );
}
