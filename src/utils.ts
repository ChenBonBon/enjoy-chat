import { userList } from './constants';
import { addUser } from './requests/user';

/**
 * 生成一个介于0和指定最大值之间的随机时间值。
 *
 * @param {number} max - 随机时间的最大值。
 * @returns {number} 生成的随机时间值。
 */
export function getRandomTime(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * 判断给定时间是否在有效的撤销时间范围内。
 *
 * @param {number} time - 要检查的时间。
 * @return {boolean} 如果时间在有效的撤销时间范围内，则返回true；否则返回false。
 */
export function getCanRevoke(time: number): boolean {
  if (Date.now() - time > import.meta.env.VITE_REVOKE_TIME) {
    return false;
  }
  return true;
}

/**
 * 将给定元素滚动到底部（如果尚未滚动到底部）。
 *
 * @param {HTMLDivElement} element - 要滚动的元素。
 */
function scrollToBottom(element: HTMLDivElement) {
  const currentScroll = element.scrollTop;
  const clientHeight = element.offsetHeight;
  const scrollHeight = element.scrollHeight;
  if (scrollHeight - 10 > currentScroll + clientHeight) {
    window.requestAnimationFrame(() => {
      scrollToBottom(element);
    });
    element.scrollTo(
      0,
      currentScroll + (scrollHeight - currentScroll - clientHeight) / 2,
    );
  }
}

/**
 * MutationObserver 的回调函数，配合上面的 scrollToBottom 函数使用。
 *
 * @param {MutationRecord[]} mutationsList - 观察到的 MutationRecord 列表。
 */
export function scrollToBottomObserverCallback(
  mutationsList: MutationRecord[],
) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      if (mutation.addedNodes.length > 0) {
        if (mutation.target.nodeType === 1) {
          const parentElement = mutation.target.parentElement
            ?.parentElement as HTMLDivElement;
          if (parentElement) {
            scrollToBottom(parentElement);
          }
        }
      }
    }
  }
}

/**
 * 空函数
 *
 */
export function blank() {
  return;
}

/**
 * 导入默认用户数据。
 *
 */
export function importUser() {
  Promise.all(
    userList.map((user) => addUser(user.name, user.description, user.avatar)),
  );
}
