import { createTheme } from '@kuma-ui/core';

const theme = createTheme({
  colors: {
    primary: {
      light: 'var(--primary-light)',
      default: 'var(--primary)',
      dark: 'var(--primary-dark)',
    },
    white: 'var(--white)',
    grey: {
      light1: 'var(--greyLight-1)',
      light2: 'var(--greyLight-2)',
      light3: 'var(--greyLight-3)',
      dark: 'var(--greyDark)',
    },
    shadow: 'var(--var-shadow)',
    shadowHover: 'var(--var-shadowHover)',
    innerShadow: 'var(--var-innerShadow)',
    alert: {
      error: 'var(--error)',
      info: 'var(--info)',
      success: 'var(--success)',
      warning: 'var(--warning)',
    },
  },
});

type UserTheme = typeof theme;

declare module '@kuma-ui/core' {
  export interface Theme extends UserTheme {}
}

export default theme;
