import { IconButton as RIconButton } from '@radix-ui/themes';
import { MouseEvent } from 'react';
import styled from 'styled-components';

const IconButton = styled(RIconButton)<{
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}>`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

export default IconButton;
