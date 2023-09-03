import { Button as RButton } from '@radix-ui/themes';
import { MouseEvent } from 'react';
import styled from 'styled-components';

// 按钮，设置 onClick 事件时设置鼠标指针为 pointer
const Button = styled(RButton)<{
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}>`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

export default Button;
