import { IconButton as RIconButton } from '@radix-ui/themes';
import { MouseEvent } from 'react';
import styled from 'styled-components';

// 图标按钮，设置 onClick 事件时设置鼠标指针为 pointer
const IconButton = styled(RIconButton)<{
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}>`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

export default IconButton;
