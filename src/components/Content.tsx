import { Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { styled } from "styled-components";

interface IMessageCard {
  createdAt: number;
  myMessage?: boolean;
  className?: string;
  children?: ReactNode;
}

const Wrapper = styled.div<{ $myMessage?: boolean; className?: string }>`
  width: 40%;
  text-align: right;
  float: ${({ $myMessage }) => ($myMessage ? "right" : "left")};
`;

export default function Content(props: IMessageCard) {
  return (
    <Wrapper $myMessage={props.myMessage} className={props.className}>
      <Text size="1" color="gray">
        {dayjs(props.createdAt).format("YYYY-MM-DD HH:mm:ss")}
      </Text>
      {props.children}
    </Wrapper>
  );
}
