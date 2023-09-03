import { Button as RButton } from '@radix-ui/themes';
import { MouseEvent } from 'react';
import styled from 'styled-components';

const Button = styled(RButton)<{
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}>`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

export default Button;
