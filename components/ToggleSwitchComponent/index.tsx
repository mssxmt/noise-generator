import { css } from '@kuma-ui/core';
import { IconSatellite, IconPlanet } from '@tabler/icons-react';
import { ChangeEvent, ReactNode } from 'react';

const Switch = css`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;
  justify-self: center;
  input {
    position: absolute;
    opacity: 0;
    visibility: hidden;
  }
  & input:checked {
    & ~ label {
      &::before {
        opacity: 0.5;
      }
      &::after {
        left: 57%;
        background: var(--greyLight-1);
      }
    }
  }
`;

const Input = css`
  width: 6rem;
  label {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    box-shadow: t('colors.shadow');
    background: rgba(255, 255, 255, 0);
    position: relative;
    cursor: pointer;
    border-radius: 1.6rem;

    &::after {
      content: '';
      position: absolute;
      left: 0.4rem;
      width: 2.1rem;
      height: 2.1rem;
      border-radius: 50%;
      background: var(--greyDark);
      transition: all 0.4s ease;
    }
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(
        330deg,
        var(--primary-dark) 0%,
        var(--primary) 50%,
        var(--primary-light) 100%
      );
      opacity: 0;
      transition: all 0.4s ease;
    }
  }
`;

const IconWrapper = css`
  position: absolute;
  top: 50%;
  left: 0.4rem;
  transform: translateY(-50%);
  transition: all 0.4s ease;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
`;

type Props = {
  id: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  checkedIcon?: ReactNode;
  uncheckedIcon?: ReactNode;
};
export const ToggleSwitch = ({
  id,
  checked,
  setChecked,
  checkedIcon = <IconPlanet size={18} />,
  uncheckedIcon = <IconSatellite size={18} />,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <div className={Switch}>
        <div className={Input}>
          <input
            id={id}
            type='checkbox'
            checked={checked}
            onChange={(e) => {
              e.stopPropagation();
              handleChange(e);
            }}
          />
          <label htmlFor={id}>
            <div
              className={IconWrapper}
              style={{
                left: checked ? '57%' : '0.4rem',
                color: checked ? 'var(--primary-dark)' : 'var(--greyLight-1)',
              }}
            >
              {checked ? checkedIcon : uncheckedIcon}
            </div>
          </label>
        </div>
      </div>
    </>
  );
};
