import { css } from '@kuma-ui/core';

const RadioInputStyle = css`
  input {
    position: absolute;
    top: -100vh;
    left: -100vw;
    visibility: hidden;
    opacity: 0;
  }

  :has(p) {
    color: t('colors.grey.dark');
  }
  & input:checked {
    & ~ label {
      box-shadow: t('colors.innerShadow');
      &::after {
        background: t('colors.primary.default');
      }
    }
    & ~ p {
      color: t('colors.primary.dark');
    }
  }
  label {
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
  }
`;

type Props = {
  values: { name: string; value: number }[];
  name: string;
  onChange: (value: number) => void;
  selectedValue: number;
  type: 'checkbox' | 'radio';
};
const RadioInput: React.FC<Props> = ({
  values,
  name,
  onChange,
  selectedValue,
  type,
}) => {
  return values.map((i) => (
    <div key={i.name} className={RadioInputStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <input
          id={i.name}
          type={type}
          name={name}
          value={i.value}
          onChange={(e) => onChange(Number(e.target.value))}
          checked={i.value === selectedValue}
        />
        <label htmlFor={i.name}></label> <p>{i.name}</p>
      </div>
    </div>
  ));
};

export default RadioInput;
