import { MouseEvent, ReactNode } from "react";
import { styled } from "styled-components";

export interface IIcon {
  className?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<SVGElement>) => void;
}

const Wrapper = styled.svg<{
  onClick?: (event: MouseEvent<SVGElement>) => void;
}>`
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
`;

export default function Icon(props: IIcon) {
  return (
    <Wrapper
      className={props.className}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      onClick={props.onClick}
    >
      {props.children}
    </Wrapper>
  );
}
