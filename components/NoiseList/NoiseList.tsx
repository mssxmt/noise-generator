'use client';
import { NoiseType } from '@/utils/noiseGenerators';
import { css } from '@kuma-ui/core';

type Props = {
  noiseType: NoiseType;
  setNoiseType: (noiseType: NoiseType) => void;
};

const noiseOptions: { value: NoiseType; label: string }[] = [
  { value: 'white', label: 'white' },
  { value: 'pink', label: 'pink' },
  { value: 'brown', label: 'brown' },
  { value: 'perlin', label: 'perlin' },
  { value: 'crackle', label: 'crackle' },
  { value: 'square', label: 'square' },
  { value: 'plus', label: 'plus' },
  { value: 'sawtooth', label: 'sawtooth' },
];

const Select = css`
  appearance: none;
  outline: none;
  border: none;
  width: 15rem;
  height: 4rem;
  border-radius: 1rem;
  box-shadow: t('colors.shadow');
  background-color: transparent; //t('colors.grey.light1');
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.3s ease;
  text-align: center;
  padding: 0 8px;
  transition: all 0.5s ease;
  color: t('colors.grey.dark');
  &:hover {
    color: t('colors.primary.default');
    box-shadow: t('colors.shadowHover');
  }
  &:active {
    box-shadow: t('colors.innerShadow');
  }
`;

const NoiseList: React.FC<Props> = ({ noiseType, setNoiseType }) => {
  return (
    <select
      className={Select}
      value={noiseType}
      onChange={(e) => setNoiseType(e.target.value as NoiseType)}
    >
      {noiseOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default NoiseList;
