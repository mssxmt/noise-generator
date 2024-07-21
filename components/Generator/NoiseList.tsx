'use client';
import { NoiseType } from '@/utils/noiseGenerators';

type Props = {
  noiseType: NoiseType;
  setNoiseType: (noiseType: NoiseType) => void;
};

const noiseOptions: { value: NoiseType; label: string }[] = [
  { value: 'white', label: 'ホワイトノイズ' },
  { value: 'pink', label: 'ピンクノイズ' },
  { value: 'brown', label: 'ブラウンノイズ' },
  { value: 'perlin', label: 'パーリンノイズ' },
  { value: 'crackle', label: 'クラックルノイズ' },
  { value: 'square', label: 'スクエアノイズ' },
  { value: 'plus', label: 'サインノイズ' },
  { value: 'sawtooth', label: 'サウドノイズ' },
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
