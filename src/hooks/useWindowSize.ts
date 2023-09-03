import { useCallback, useEffect, useState } from 'react';

/**
 * 返回一个包含宽度和高度的对象，表示窗口的大小。
 *
 * @return {object} 窗口大小对象。
 */
export default function useWindowSize() {
  // 窗口大小
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 更新窗口大小
  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  // 监听窗口大小变化
  useEffect(() => {
    window.addEventListener('resize', handleResize, false);

    return () => {
      window.removeEventListener('resize', handleResize, false);
    };
  }, [handleResize]);

  return { windowSize };
}
