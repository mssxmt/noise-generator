import { NoiseType } from '@/utils/noiseGenerators';
import { ControlButtons } from '../ControlButtons/ControlButtons';
import RangeInputComponent from '../Input/RangeInput';
import NoiseList from '../NoiseList/NoiseList';
import { useState } from 'react';
import { css } from '@kuma-ui/core';

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

const BoxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 160px;
  padding: 0 1rem;
  overflow: visible;
  transition: all 0.3s ease;
  opacity: 1;

  &[data-open='close'] {
    height: 0;
    overflow: hidden;
    opacity: 0;
  }
`;

const ButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  &[data-open='close'] {
    margin-bottom: 0;
  }
`;

type Props = {
  noiseType: NoiseType;
  setNoiseType: React.Dispatch<React.SetStateAction<NoiseType>>;
  isPlaying: boolean;
  handleGenerateAndPlay: ({
    isPreview,
  }: {
    isPreview: boolean;
  }) => Promise<void>;
  handleStop: () => void;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
};
export const SoundController = ({
  noiseType,
  setNoiseType,
  isPlaying,
  handleGenerateAndPlay,
  handleStop,
  duration,
  setDuration,
  volume,
  setVolume,
}: Props) => {
  const [isMinimized, setIsMinimized] = useState(true);
  return (
    <div>
      <button
        data-open={isMinimized ? 'open' : 'close'}
        className={ButtonStyle}
        title='minimize'
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div
          data-open={isMinimized ? 'open' : 'close'}
          className={PlusMinus}
        ></div>
        <p>Sound Preview</p>
      </button>
      <div className={BoxStyle} data-open={isMinimized ? 'open' : 'close'}>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <NoiseList noiseType={noiseType} setNoiseType={setNoiseType} />
            <ControlButtons
              isPlaying={isPlaying}
              handleGenerateAndPlay={handleGenerateAndPlay}
              handleStop={handleStop}
            />
          </div>
        </div>
        <div>
          <RangeInputComponent
            as='Duration'
            label='Duration'
            value={duration}
            setValue={setDuration}
            min={0.02}
            max={3}
            step={0.01}
          />
        </div>
        <div>
          <RangeInputComponent
            as='Volume'
            label='Volume'
            value={volume}
            setValue={setVolume}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
};
