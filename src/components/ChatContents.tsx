import { ContextMenu, Flex, ScrollArea } from '@radix-ui/themes';
import { useEffect, useRef } from 'react';
import MessageCard from '../components/MessageCard';
import { ChatContent } from '../db';
import useWindowSize from '../hooks/useWindowSize';
import {
  addChatDelete,
  addChatLike,
  removeChatContent,
  removeChatLike,
} from '../requests/chat';
import { getCanRevoke, scrollToBottomObserverCallback } from '../utils';
import ImageCard from './ImageCard';

export interface IContent extends ChatContent {
  likeId?: number;
}

interface IChatContents {
  contents?: IContent[];
}

// 监听聊天内容 DOM 的变化
const observer = new MutationObserver(scrollToBottomObserverCallback);

/**
 * 撤回指定 ID 的聊天内容。
 *
 * @param {number} id - 要撤回的聊天内容的 ID。
 */
function revoke(id: number) {
  removeChatContent(id);
}

export default function ChatContents(props: IChatContents) {
  // 当前用户 id
  const currentUserId = Number(localStorage.getItem('userId'));
  // 聊天内容 DOM
  const chatContentRef = useRef<HTMLDivElement>(null);
  // 获取当前窗口尺寸
  const { windowSize } = useWindowSize();

  /**
   * 删除具有给定内容ID的消息。
   *
   * @param {number} contentId - 要删除的消息内容的ID。
   */
  function deleteMessage(contentId: number) {
    addChatDelete(Number(contentId), currentUserId);
  }

  /**
   * 切换内容的点赞状态。
   *
   * @param {number} contentId - 要切换点赞的内容的ID。
   * @param {number} [id] - 要删除的点赞的ID。如果未提供，则会添加一个新的点赞。
   * @return {void}
   */
  function toggleLike(contentId: number, id?: number) {
    if (id) {
      removeChatLike(Number(id));
    } else {
      addChatLike(Number(contentId), currentUserId);
    }
  }

  // 监听聊天内容 DOM 变化
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
      scrollbars='vertical'
      style={{ height: windowSize.height - 72 - 64 - 25 - 32 }}>
      <Flex direction='column' gap='5' px='5' py='4' ref={chatContentRef}>
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
                }}>
                {chatContent.likeId ? '取消点赞' : '点赞'}
              </ContextMenu.Item>
              <ContextMenu.Separator />
              {getCanRevoke(chatContent.createdAt) &&
                chatContent.createdBy === currentUserId && (
                  <ContextMenu.Item
                    onClick={() => {
                      revoke(chatContent.id!);
                    }}>
                    撤回
                  </ContextMenu.Item>
                )}
              <ContextMenu.Item
                onClick={() => {
                  deleteMessage(chatContent.id!);
                }}>
                删除
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        ))}
      </Flex>
    </ScrollArea>
  );
}
