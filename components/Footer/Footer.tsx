import { css } from '@kuma-ui/core';

const FooterStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0 1rem 0;
  color: t('colors.primary.default');
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  height: fit-content;
  box-shadow: t('colors.shadow');
  border-radius: 1rem;
`;
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={FooterStyle}>
      <small className=''>© {currentYear} NoiseXenerator by MSSXMT</small>
    </footer>
  );
};
