import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { MouseEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StatusMap } from "../constants";
import { User } from "../db";
import { updateUser } from "../requests/user";
import Button from "./Button";

const Wrapper = styled(Card)`
  width: 400px;
  cursor: pointer;
`;

export default function UserCard(props: User) {
  const navigate = useNavigate();

  const handleSelectUser = useCallback(() => {
    navigate(`/users/${props.id}/friends`);
  }, [navigate, props.id]);

  const handleChangeStatus = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const status = props.status === "online" ? "offline" : "online";

      updateUser(props.id!, status);
    },
    [props.id, props.status]
  );

  return (
    <Wrapper onClick={handleSelectUser}>
      <Flex gap="3" align="center" justify="between">
        <Flex gap="3" align="center">
          {props.avatar && (
            <Avatar size="3" src={props.avatar} radius="full" fallback="T" />
          )}
          <Box>
            <Text as="div" size="2" weight="bold">
              {props.name}
            </Text>
            <Text as="div" size="2" color="gray">
              {props.description}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Text as="div" size="2" color="gray" align="center">
            {StatusMap[props.status].label}
          </Text>
          <Button onClick={handleChangeStatus}>
            {StatusMap[props.status].action}
          </Button>
        </Box>
      </Flex>
    </Wrapper>
  );
}
