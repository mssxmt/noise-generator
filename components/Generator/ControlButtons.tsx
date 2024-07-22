import { css } from '@kuma-ui/core';
import {
  IconBowlChopsticks,
  IconBowlChopsticksFilled,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from '@tabler/icons-react';
import { useState } from 'react';

const Button = css`
  appearance: none;
  outline: none;
  border: none;
  width: 4rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  box-shadow: t('colors.shadow');
  background-color: transparent; //t('colors.grey.light1');

  cursor: pointer;
  transition: 0.3s ease;
  text-align: center;

  color: t('colors.grey.dark');

  &:hover {
    color: t('colors.primary.default');
    box-shadow: t('colors.shadowHover');
  }
  &:active {
    box-shadow: t('colors.innerShadow');
  }
`;

const PlayButton = css`
  transition: 0.3s ease;
  &:hover,
  :active {
    color: t('colors.alert.success');
  }
`;

type Props = {
  isPlaying: boolean;
  handleGenerateAndPlay: ({ isPreview }: { isPreview: boolean }) => void;
  handleStop: () => void;
};

export const ControlButtons = ({
  isPlaying,
  handleGenerateAndPlay,
  handleStop,
}: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <>
      {isPlaying ? (
        <button title='停止' className={Button} onClick={handleStop}>
          <IconPlayerStopFilled />
        </button>
      ) : (
        <button
          title='再生'
          className={Button}
          onClick={() => handleGenerateAndPlay({ isPreview: true })}
        >
          <IconPlayerPlayFilled className={PlayButton} />
        </button>
      )}
      <button
        title='保存'
        className={Button}
        onClick={() => handleGenerateAndPlay({ isPreview: false })}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering ? <IconBowlChopsticksFilled /> : <IconBowlChopsticks />}
      </button>
    </>
  );
};
