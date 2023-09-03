import { Avatar, Box, Card, Flex, Text, Tooltip } from '@radix-ui/themes';
import { MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';
import { StatusMap } from '../constants';
import { User } from '../db';
import IconButton from './IconButton';

type Action = {
  key: string;
  label: string;
  icon: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

interface IUserCard extends Omit<User, 'status'> {
  status?: 'online' | 'offline';
  onClick?: () => void;
  actions?: Action[];
}

const Wrapper = styled(Card)`
  width: 400px;
  cursor: pointer;
`;

/**
 * 渲染用户卡片组件。
 *
 * @param {IUserCard} props - 包含用户卡片数据的props对象。
 * @return {JSX.Element} 渲染的用户卡片组件。
 */
export default function UserCard(props: IUserCard) {
  return (
    <Wrapper onClick={props.onClick}>
      <Flex gap='3' align='center' justify='between'>
        <Flex gap='3' align='center'>
          {props.avatar && (
            <Avatar size='3' src={props.avatar} radius='full' fallback='T' />
          )}
          <Box>
            <Text as='div' size='2' weight='bold'>
              {props.name}
            </Text>
            <Text as='div' size='2' color='gray'>
              {props.description}
            </Text>
          </Box>
        </Flex>
        <Box>
          {props.status && (
            <Text as='div' size='2' color='gray' align='center'>
              {StatusMap[props.status].label}
            </Text>
          )}
          {props.actions && (
            <Flex gap='3' justify='end'>
              {props.actions.map((action) => (
                <Tooltip key={action.key} content={action.label}>
                  <IconButton data-id={props.id} onClick={action.onClick}>
                    {action.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Flex>
          )}
        </Box>
      </Flex>
    </Wrapper>
  );
}
