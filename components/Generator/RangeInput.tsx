'use client';

import React from 'react';

type Props = {
  as: 'Duration' | 'Volume';
  label: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
};

const RangeInputComponent: React.FC<Props> = ({
  as,
  label,
  value,
  setValue,
  min,
  max,
  step,
}) => {
  return (
    <label>
      {label}: {value}
      {as === 'Duration' && 's'}
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </label>
  );
};

export default RangeInputComponent;
