export function getRandomTime(max: number) {
  return Math.floor(Math.random() * max);
}

export function getCanRevoke(time: number) {
  if (Date.now() - time > 5 * 60 * 1000) {
    return false;
  }
  return true;
}

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

export function blank() {
  return;
}
