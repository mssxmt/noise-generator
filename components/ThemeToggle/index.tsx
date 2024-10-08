'use client';

import type { FC } from 'react';
import { useTheme } from 'next-themes';
import { css, styled } from '@kuma-ui/core';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { UserGuide } from '../UserGuide/UserGuide';
import { useScrollLock } from '@/hooks/useScrollLock';

const ToggleContainer = styled('div')`
  display: flex;
  background-color: transparent;
  padding: 10px;
`;

const ToggleButton = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 0 5px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: t('colors.grey.dark');
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    box-shadow: t('colors.shadowHover');
    color: t('colors.primary.default');
  }

  &.active {
    box-shadow: t('colors.shadow');
    color: t('colors.primary.light');
  }

  @media screen and (max-width: 700px) {
    width: 30px;
    height: 30px;
  }
`;

const iconStyle = css`
  width: 24px;
  height: 24px;
`;

export const ThemeToggle: FC = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const { isOpen, onOpenDrawer, onCloseDrawer } = useScrollLock();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ToggleContainer>
      {isOpen && <UserGuide onClose={onCloseDrawer} />}
      <ToggleButton
        style={{ boxShadow: 'var(--var-shadow)' }}
        onClick={() => onOpenDrawer()}
      >
        help
      </ToggleButton>
      <ToggleButton
        onClick={() => setTheme('light')}
        className={theme === 'light' ? 'active' : ''}
      >
        <IconSun className={iconStyle} />
      </ToggleButton>
      <ToggleButton
        onClick={() => setTheme('dark')}
        className={theme === 'dark' ? 'active' : ''}
      >
        <IconMoon className={iconStyle} />
      </ToggleButton>
      <ToggleButton
        onClick={() => setTheme('system')}
        className={theme === 'system' ? 'active' : ''}
      >
        <IconDeviceDesktop className={iconStyle} />
      </ToggleButton>
    </ToggleContainer>
  );
};
