import { AlertDialog, Flex } from "@radix-ui/themes";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusMap } from "../constants";
import { User } from "../db";
import { updateUser } from "../requests/user";
import Button from "./Button";
import DownIcon from "./Icon/Down";
import UpIcon from "./Icon/Up";
import UserCard from "./UserCard";
import { blank } from "../utils";

export function LoginUserCard(props: User) {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  function open() {
    setOpened(true);
  }

  function cancel() {
    setOpened(false);
  }

  async function handleSelectUser() {
    await updateUser(props.id!, "online");
    cancel();
    localStorage.setItem("userId", props.id!.toString());
    navigate(`/users/${props.id}/friends`);
  }

  async function handleChangeStatus(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const status = props.status === "online" ? "offline" : "online";

    await updateUser(props.id!, status);
  }

  return (
    <AlertDialog.Root open={opened}>
      <UserCard
        {...props}
        onClick={open}
        actions={[
          {
            key: "changeStatus",
            label: StatusMap[props.status].action,
            icon: props.status === "online" ? <DownIcon onClick={blank} /> : <UpIcon onClick={blank} />,
            onClick: handleChangeStatus,
          },
        ]}
      />
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>登录</AlertDialog.Title>
        <AlertDialog.Description size="2">
          确定以<span>{props.name}</span>账户登录吗？
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" onClick={cancel}>
              取消
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={handleSelectUser}>确定</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
