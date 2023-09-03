import { Flex, Portal } from "@radix-ui/themes";
import { useState } from "react";
import { styled } from "styled-components";
import Content from "./Content";
import LikeIcon from "./LikeIcon";
import ZoomedImage from "./ZoomedImage";

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

export default function ImageCard(props: IImageCard) {
  const [zoomed, setZoomed] = useState(false);

  function zoomIn() {
    setZoomed(true);
  }

  function zoomOut() {
    setZoomed(false);
  }

  return (
    <Content {...props}>
      <Flex align="center" gap="3">
        {props.myMessage && (
          <LikeIcon $active={typeof props.likeId !== "undefined"} />
        )}
        <Image src={props.image} onClick={zoomIn} style={{ flex: 1 }} />
        {!props.myMessage && (
          <LikeIcon $active={typeof props.likeId !== "undefined"} />
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
