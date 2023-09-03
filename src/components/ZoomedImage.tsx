import { styled } from "styled-components";
import CloseIcon from "./Icon/Close";

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

export default function ZoomedImage(props: IZoomedImage) {
  return (
    <Wrapper>
      <ZoomedImageCloseIcon onClick={props.onClose} />
      <img src={props.image} width="100%" />
    </Wrapper>
  );
}
