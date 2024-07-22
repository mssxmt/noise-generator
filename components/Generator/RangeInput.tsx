'use client';

import { css } from '@kuma-ui/core';
import React from 'react';

const rangeInput = css`
  appearance: none;
  width: 100%;
  height: 80px;
  border-radius: 1rem;
  background-color: transparent; // t('colors.grey.light1')
  outline: none;
  transition: all 0.3s ease;
  box-shadow: t('colors.shadow');

  &:hover {
    box-shadow: t('colors.shadowHover');
  }
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 70px;
    border-radius: 4px;
    background-color: t('colors.grey.dark');
    cursor: grab;
    transition: all 0.3s ease;
    box-shadow: t('colors.shadow');

    &:hover {
      background-color: t('colors.primary.default');
      transform: scale(1.1);
    }
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: t('colors.grey.dark');
    cursor: grab;
    transition: all 0.3s ease;

    &:hover {
      background-color: t('colors.primary.default');
      transform: scale(1.1);
    }
  }
`;

const rangeLabel = css`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  color: t('colors.grey.dark');
  &:hover {
    color: t('colors.primary.default');
  }
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

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
    <label className={rangeLabel}>
      {label}: {parseFloat((value * 100).toFixed(0))}
      {as === 'Duration' && ' ms'}
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className={rangeInput}
      />
    </label>
  );
};

export default RangeInputComponent;
