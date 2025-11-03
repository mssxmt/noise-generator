'use client';

import React from 'react';
import { Generator } from '../Generator/Generator';
import { ThemeToggle } from '../ThemeToggle';

/**
 * クライアントサイドでレンダリングされるコンポーネントをラップするためのコンポーネント。
 * @returns {JSX.Element} - クライアントサイドでレンダリングされるコンポーネント。
 */
export const ClientWrapper: React.FC = () => {
  // クライアントサイドの状態管理ロジック

  return (
    <>
      <ThemeToggle />
      <Generator />
      {/* ここに必要なクライアントサイドのロジックや状態を持つコンポーネントを配置 */}
    </>
  );
};
