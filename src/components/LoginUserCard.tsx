import { AlertDialog, Flex } from '@radix-ui/themes';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusMap } from '../constants';
import { User } from '../db';
import { updateUser } from '../requests/user';
import { blank } from '../utils';
import Button from './Button';
import DownIcon from './Icon/Down';
import UpIcon from './Icon/Up';
import UserCard from './UserCard';

/**
 * 渲染用于登录的用户卡片组件。
 *
 * @param {User} props - 包含用户详细信息的用户对象。
 * @return {JSX.Element} 渲染的用户卡片组件。
 */
export function LoginUserCard(props: User) {
  const navigate = useNavigate();
  // 登录弹窗状态
  const [opened, setOpened] = useState(false);

  /*
   * 打开登录弹窗
   */
  function open() {
    setOpened(true);
  }

  /*
   * 关闭登录弹窗
   */
  function cancel() {
    setOpened(false);
  }

  /*
   * 登录
   */
  async function handleSelectUser() {
    await updateUser(props.id!, 'online');
    cancel();
    localStorage.setItem('userId', props.id!.toString());
    navigate(`/users/${props.id}/friends`);
  }

  /*
   * 改变用户状态
   */
  async function handleChangeStatus(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const status = props.status === 'online' ? 'offline' : 'online';

    await updateUser(props.id!, status);
  }

  return (
    <AlertDialog.Root open={opened}>
      <UserCard
        {...props}
        onClick={open}
        actions={[
          {
            key: 'changeStatus',
            label: StatusMap[props.status].action,
            icon:
              props.status === 'online' ? (
                <DownIcon onClick={blank} />
              ) : (
                <UpIcon onClick={blank} />
              ),
            onClick: handleChangeStatus,
          },
        ]}
      />
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>登录</AlertDialog.Title>
        <AlertDialog.Description size='2'>
          确定以<span>{props.name}</span>账户登录吗？
        </AlertDialog.Description>

        <Flex gap='3' mt='4' justify='end'>
          <AlertDialog.Cancel>
            <Button variant='soft' onClick={cancel}>
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
