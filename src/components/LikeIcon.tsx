import { styled } from 'styled-components';
import Like from './Icon/Like';

const LikeIcon = styled(Like)<{ $active?: boolean }>`
  color: ${({ $active }) => ($active ? 'coral' : 'transparent')};
`;

export default LikeIcon;
