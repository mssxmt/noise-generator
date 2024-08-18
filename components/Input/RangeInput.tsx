'use client';

import { css } from '@kuma-ui/core';
import React, { useState } from 'react';

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

  [data-open='close'] &::-webkit-slider-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: t('colors.grey.dark');
    cursor: grab;
    transition: all 0.3s ease;

    &:hover {
      background-color: t('colors.primary.default');
      transform: scale(1);
    }
  }

  [data-open='close'] &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: t('colors.grey.dark');
    cursor: grab;
    transition: all 0.3s ease;

    &:hover {
      background-color: t('colors.primary.default');
      transform: scale(1);
    }
  }
`;

const rangeLabel = css`
  margin-bottom: 10px;
  font-size: 16px;
  color: t('colors.grey.dark');
  &:hover {
    color: t('colors.primary.default');
  }
  display: flex;
  flex-direction: column;
  gap: 12px;

  &[data-open='close'] {
    height: 20px;
  }
`;

const PlusMinus = css`
  position: relative;
  width: 15px;
  height: 15px;
  cursor: pointer;

  &[data-open='close'] {
    &:before {
      transform: translatey(-50%) rotate(-90deg);
      opacity: 0;
    }
    &:after {
      transform: translatey(-50%) rotate(0);
    }
  }

  &:before,
  &:after {
    content: '';
    display: block;
    background-color: t('colors.primary.default');
    position: absolute;
    top: 50%;
    left: 0;
    transition: 0.35s;
    width: 100%;
    height: 3px;
  }

  &:before {
    transform: translatey(-50%);
  }

  &:after {
    transform: translatey(-50%) rotate(90deg);
  }
`;

type Props = {
  as: 'Duration' | 'Volume';
  label: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  nomalValueLabel?: boolean;
};

const RangeInputComponent: React.FC<Props> = ({
  as,
  label,
  value,
  setValue,
  min,
  max,
  step,
  nomalValueLabel = false,
}) => {
  const [isMinimized, setIsMinimized] = useState(true);
  return (
    <>
      <label className={rangeLabel} data-open={isMinimized ? 'close' : 'open'}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button title='minimize' onClick={() => setIsMinimized(!isMinimized)}>
            <div
              data-open={isMinimized ? 'open' : 'close'}
              className={PlusMinus}
            ></div>
          </button>
          <p>
            {label}:
            {nomalValueLabel ? value : parseFloat((value * 100).toFixed(0))}
            {as === 'Duration' && ' ms'}
          </p>
        </span>
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            e.stopPropagation();
            setValue(Number(e.target.value));
          }}
          className={rangeInput}
        />
      </label>
    </>
  );
};

export default RangeInputComponent;
