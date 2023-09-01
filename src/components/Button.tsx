import { Button as RButton } from "@radix-ui/themes";
import { MouseEvent, ReactNode } from "react";
import styled from "styled-components";

interface IButton {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const StyledButton = styled(RButton)<{
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}>`
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
`;

export default function Button(props: IButton) {
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>;
}
