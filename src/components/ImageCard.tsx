import { Portal, Text } from "@radix-ui/themes";
import { useCallback, useState } from "react";
import { styled } from "styled-components";
import Content from "./Content";
import CloseIcon from "./Icon/Close";
import LikeIcon from "./Icon/Like";

interface IImageCard {
  image: string;
  createdAt: number;
  myMessage?: boolean;
  className?: string;
  likeId?: number;
}

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const ZoomedImage = styled.div`
  position: fixed;
  width: 80vw;
  height: 60vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ZoomedImageCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const ImageLikeIcon = styled(LikeIcon)`
  position: absolute;
  bottom: 24px;
  left: 24px;
`;

export default function ImageCard(props: IImageCard) {
  const [zoomed, setZoomed] = useState(false);

  const zoomIn = useCallback(() => {
    setZoomed(true);
  }, []);

  const zoomOut = useCallback(() => {
    setZoomed(false);
  }, []);

  return (
    <Content {...props}>
      <ImageWrapper>
        {props.likeId && (
          <Text color={props.myMessage ? "green" : "gray"}>
            <ImageLikeIcon />
          </Text>
        )}
        <Image src={props.image} onClick={zoomIn} />
      </ImageWrapper>
      {zoomed && (
        <Portal>
          <ZoomedImage>
            <ZoomedImageCloseIcon onClick={zoomOut} />
            <Image src={props.image} />
          </ZoomedImage>
        </Portal>
      )}
    </Content>
  );
}
