import { useOutsideClick } from '@/hooks/useOutsideClick';
import { css } from '@kuma-ui/core';
import { useCallback, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const ButtonStyle = css`
  box-shadow: t('colors.shadow');
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 3.8rem;
  height: 1.8rem;
  border-radius: 1.2rem;

  &:hover {
    &::after {
      background: t('colors.primary.default');
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 2.4rem;
    height: 0.8rem;
    background: t('colors.grey.dark');
    border-radius: 0.4rem;
    transition: 0.3s ease;
  }

  &:active {
    box-shadow: t('colors.innerShadow');
    &::after {
      background: t('colors.primary.default');
    }
  }
`;
const ColorfulStyle = css`
  box-shadow: t('colors.shadow');
  border-radius: 1rem;
  background-color: t('colors.grey.light1');
  position: absolute;
  left: calc(100% + 16px);
  transition: all 0.5s ease;
  z-index: 1;
  overflow: hidden;
  .react-colorful {
    width: auto;
    height: 100px;
  }
  .react-colorful__hue {
    height: 10px;
  }
`;

type Props = {
  value: string;
  onChange: (value: string) => void;
};
const ColorInput: React.FC<Props> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(false);
  }, []);
  const { ref } = useOutsideClick(handleOpen);
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
      }}
      ref={ref}
    >
      <button
        className={ButtonStyle}
        title='color'
        onClick={() => setIsOpen(!isOpen)}
      />

      <div
        style={{
          width: isOpen ? '200px' : '0',
          padding: isOpen ? '0.8rem' : '0',
        }}
        className={ColorfulStyle}
      >
        <HexColorPicker
          color={value}
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>
    </div>
  );
};

export default ColorInput;
