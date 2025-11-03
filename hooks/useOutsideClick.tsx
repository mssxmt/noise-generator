import { useEffect, useRef } from 'react';

/**
 * 指定された要素の外側をクリックしたときにコールバックを呼び出すカスタムフック。
 * @param {() => void} callback - 要素の外側をクリックしたときに呼び出すコールバック関数。
 * @returns {{ ref: React.RefObject<HTMLDivElement> }} - 監視する要素にアタッチするためのrefオブジェクト。
 */
export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [callback]);

  return { ref };
};
