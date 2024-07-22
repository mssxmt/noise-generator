import { css } from '@kuma-ui/core';
import { IconWaveSine, IconWaveSquare } from '@tabler/icons-react';

const HeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  color: t('colors.primary.default');
  width: 100%;
  max-width: 800px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  height: 60px;
  box-shadow: t('colors.shadow');
  border-radius: 1rem;
`;

const Div = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className={HeaderStyle}>
      <div className={Div}>
        <IconWaveSine />
        <h1>NOISE GENERATOR</h1>
        <IconWaveSquare />
      </div>
      {children}
    </header>
  );
};
