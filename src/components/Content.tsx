import { Text } from '@radix-ui/themes';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface IMessageCard {
  createdAt: number;
  myMessage?: boolean;
  className?: string;
  children?: ReactNode;
}

const Wrapper = styled.div<{ $myMessage?: boolean; className?: string }>`
  width: 40%;
  text-align: right;
  float: ${({ $myMessage }) => ($myMessage ? 'right' : 'left')};
`;

/**
 * 渲染消息卡片的内容。
 *
 * @param {IMessageCard} props - 消息卡片的属性。
 * @return {JSX.Element} - 渲染后的内容。
 */
export default function Content(props: IMessageCard) {
  return (
    <Wrapper $myMessage={props.myMessage} className={props.className}>
      <Text size='1' color='gray'>
        {dayjs(props.createdAt).format('YYYY-MM-DD HH:mm:ss')}
      </Text>
      {props.children}
    </Wrapper>
  );
}
