import { useCallback, useState } from 'react';

/**
 * bodyのスクロールを無効化するためのoverflow:hiddenクラスを付与
 *
 * @return { @isOpen 開閉状態真偽値 @onOpenDrawer 開く関数 @onCloseDrawer 閉じる関数 }
 * onOpenDrawer 実行時にhtml要素にdisabled-scrollクラスを付与
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
