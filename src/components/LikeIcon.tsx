import { styled } from 'styled-components';
import Like from './Icon/Like';

// 点赞图标
const LikeIcon = styled(Like)<{ $active?: boolean }>`
  color: ${({ $active }) => ($active ? 'coral' : 'transparent')};
`;

export default LikeIcon;
