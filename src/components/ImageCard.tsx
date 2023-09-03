import { Flex, Portal } from '@radix-ui/themes';
import { useState } from 'react';
import { styled } from 'styled-components';
import Content from './Content';
import LikeIcon from './LikeIcon';
import ZoomedImage from './ZoomedImage';

interface IImageCard {
  image: string;
  createdAt: number;
  myMessage?: boolean;
  className?: string;
  likeId?: number;
}

const Image = styled.img`
  width: calc(100% - 64px);
`;

/**
 * 渲染一个 ImageCard 组件。
 *
 * @param {IImageCard} props - ImageCard 组件的属性。
 * @return {JSX.Element} 渲染的 ImageCard 组件。
 */
export default function ImageCard(props: IImageCard) {
  // 是否放大图片
  const [zoomed, setZoomed] = useState(false);

  /**
   * 放大图片
   *
   */
  function zoomIn() {
    setZoomed(true);
  }

  /**
   * 缩小图片
   *
   */
  function zoomOut() {
    setZoomed(false);
  }

  return (
    <Content {...props}>
      <Flex align='center' gap='3'>
        {props.myMessage && (
          <LikeIcon $active={typeof props.likeId !== 'undefined'} />
        )}
        <Image src={props.image} onClick={zoomIn} style={{ flex: 1 }} />
        {!props.myMessage && (
          <LikeIcon $active={typeof props.likeId !== 'undefined'} />
        )}
      </Flex>
      {zoomed && (
        <Portal>
          <ZoomedImage image={props.image} onClose={zoomOut} />
        </Portal>
      )}
    </Content>
  );
}
