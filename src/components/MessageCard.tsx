import { Callout, Flex } from "@radix-ui/themes";
import Content from "./Content";
import LikeIcon from "./LikeIcon";

interface IMessageCard {
  text: string;
  createdAt: number;
  myMessage?: boolean;
  className?: string;
  likeId?: number;
}

export default function MessageCard(props: IMessageCard) {
  return (
    <Content {...props}>
      <Flex align="center" gap="3">
        {props.myMessage && (
          <LikeIcon $active={typeof props.likeId !== "undefined"} />
        )}
        <Callout.Root
          color={props.myMessage ? "green" : "gray"}
          style={{ flex: 1 }}
        >
          <Callout.Text>{props.text}</Callout.Text>
        </Callout.Root>
        {!props.myMessage && (
          <LikeIcon $active={typeof props.likeId !== "undefined"} />
        )}
      </Flex>
    </Content>
  );
}
