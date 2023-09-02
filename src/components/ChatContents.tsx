import { ContextMenu, Flex, ScrollArea } from "@radix-ui/themes";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import MessageCard from "../components/MessageCard";
import { ChatContent } from "../db";
import {
  addChatDelete,
  addChatLike,
  removeChatContent,
  removeChatDelete,
  removeChatLike,
} from "../requests/chat";
import ImageCard from "./ImageCard";

export interface IContent extends ChatContent {
  likeId?: number;
}

interface IChatContents {
  contents?: IContent[];
}

const currentUserId = Number(localStorage.getItem("userId"));
const observerConfigs = { childList: true };

function getCanRevoke(time: number) {
  if (Date.now() - time > 5 * 60 * 1000) {
    return false;
  }
  return true;
}

function scrollToBottom(element: HTMLDivElement) {
  const currentScroll = element.scrollTop;
  const clientHeight = element.offsetHeight;
  const scrollHeight = element.scrollHeight;
  if (scrollHeight - 10 > currentScroll + clientHeight) {
    window.requestAnimationFrame(() => {
      scrollToBottom(element);
    });
    element.scrollTo(
      0,
      currentScroll + (scrollHeight - currentScroll - clientHeight) / 2
    );
  }
}

function observerCallback(mutationsList: MutationRecord[]) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      if (mutation.addedNodes.length > 0) {
        if (mutation.target.nodeType === 1) {
          const parentElement = mutation.target.parentElement
            ?.parentElement as HTMLDivElement;
          if (parentElement) {
            scrollToBottom(parentElement);
          }
        }
      }
    }
  }
}

const observer = new MutationObserver(observerCallback);

export default function ChatContents(props: IChatContents) {
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const toggleLike = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const { id, contentid } = event.currentTarget.dataset;

    if (id) {
      removeChatLike(Number(id));
    } else {
      addChatLike(Number(contentid), currentUserId);
    }
  }, []);

  const revoke = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget.dataset.id;

    removeChatContent(Number(id));
  }, []);

  const deleteMessage = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const { id, contentid } = event.currentTarget.dataset;

    if (id) {
      removeChatDelete(Number(id));
    } else {
      addChatDelete(Number(contentid), currentUserId);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);

    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  }, [handleResize]);

  useEffect(() => {
    if (chatContentRef.current) {
      observer.observe(chatContentRef.current, observerConfigs);
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
                data-id={chatContent.likeId}
                data-contentid={chatContent.id}
                onClick={toggleLike}
              >
                {chatContent.likeId ? "取消点赞" : "点赞"}
              </ContextMenu.Item>
              <ContextMenu.Separator />
              {getCanRevoke(chatContent.createdAt) &&
                chatContent.createdBy === currentUserId && (
                  <ContextMenu.Item data-id={chatContent.id} onClick={revoke}>
                    撤回
                  </ContextMenu.Item>
                )}
              <ContextMenu.Item
                onClick={deleteMessage}
                data-id={chatContent.likeId}
                data-contentid={chatContent.id}
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
