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
  border-radius: 0 0 1rem 1rem;

  @media screen and (max-width: 1071px) {
    margin-bottom: 20px;
  }
`;

const Div = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const H1 = css`
  font-size: 1.5rem;
`;

const Title = css`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;
export const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className={HeaderStyle}>
      <div className={Div}>
        <IconWaveSine />
        <div className={Title}>
          <h1 className={H1}>NOISE GENERATOR</h1>
          <p>1.5.3</p>
        </div>
        <IconWaveSquare />
      </div>
      {children}
    </header>
  );
};
