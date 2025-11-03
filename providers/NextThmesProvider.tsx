'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { FC } from 'react';

/**
 * next-themesライブラリのThemeProviderをラップするコンポーネント。
 * @param {ThemeProviderProps} props - ThemeProviderに渡すプロパティ。
 * @returns {JSX.Element} - テーマが適用された子要素。
 */
export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  return <NextThemesProvider {...props}>{props.children}</NextThemesProvider>;
};
