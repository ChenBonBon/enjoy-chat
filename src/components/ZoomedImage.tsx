import { styled } from 'styled-components';
import CloseIcon from './Icon/Close';

interface IZoomedImage {
  image: string;
  onClose?: () => void;
}

const Wrapper = styled.div`
  position: fixed;
  width: 100vmin;
  height: 80vmin;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ZoomedImageCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 24px;
  height: 24px;
  color: white;
`;

/**
 * 渲染一个带有放大功能的图片，并包含关闭图标和指定的图片来源。
 *
 * @param {IZoomedImage} props - 包含图片来源和关闭回调函数的 props 对象。
 * @return {JSX.Element} 渲染的放大图片组件。
 */
export default function ZoomedImage(props: IZoomedImage) {
  return (
    <Wrapper>
      <ZoomedImageCloseIcon onClick={props.onClose} />
      <img src={props.image} width='100%' />
    </Wrapper>
  );
}
