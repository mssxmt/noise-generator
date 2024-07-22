'use client';
import { NoiseType } from '@/utils/noiseGenerators';

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

const NoiseList: React.FC<Props> = ({ noiseType, setNoiseType }) => {
  return (
    <select
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
