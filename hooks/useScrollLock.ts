import { useCallback, useState } from 'react';

/**
 * bodyのスクロールをロックするためのカスタムフック。
 * @returns {{
 *   isOpen: boolean;
 *   onOpenDrawer: () => void;
 *   onCloseDrawer: () => void;
 * }} スクロールロックの状態とそれを制御するための関数のセット。
 */
export const useScrollLock = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
    // bodyのスクロールを無効化するためのoverflow:hiddenクラスを付与
    document.documentElement.classList.add('disabled-scroll');
  }, [setIsOpen]);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
    document.documentElement.classList.remove('disabled-scroll');
  }, [setIsOpen]);

  return { isOpen, onOpenDrawer, onCloseDrawer };
};
