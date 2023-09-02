import { Callout } from "@radix-ui/themes";
import Content from "./Content";
import LikeIcon from "./Icon/Like";

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
      <Callout.Root color={props.myMessage ? "green" : "gray"}>
        {props.likeId && (
          <Callout.Icon>
            <LikeIcon />
          </Callout.Icon>
        )}
        <Callout.Text>{props.text}</Callout.Text>
      </Callout.Root>
    </Content>
  );
}
