import { IconCube, IconPerspective } from '@tabler/icons-react';
import RadioInput from '../Input/RadioInput';
import { ToggleSwitch } from '../ToggleSwitchComponent';
import { css } from '@kuma-ui/core';
import { useState } from 'react';
import ColorInput from '../Input/ColorInput';
import RangeInputComponent from '../Input/RangeInput';

const BoxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WrapperStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  height: auto;
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

const PlusMinus = css`
  position: relative;
  width: 15px;
  height: 15px;
  cursor: pointer;

  &[data-open='open'] {
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
  effectType: number;
  setEffectType: React.Dispatch<React.SetStateAction<number>>;
  colorMode: number;
  setColorMode: React.Dispatch<React.SetStateAction<number>>;
  wireframeMode: number;
  setWireframeMode: React.Dispatch<React.SetStateAction<number>>;
  displayChecked: boolean;
  setDiscplayChecked: React.Dispatch<React.SetStateAction<boolean>>;
  visualizerChangeChecked: boolean;
  setVisualizerChangeChecked: React.Dispatch<React.SetStateAction<boolean>>;
  strokeColor: string;
  setstrokeColor: React.Dispatch<React.SetStateAction<string>>;
  lineWidth: number;
  setLineWidth: React.Dispatch<React.SetStateAction<number>>;
  sliceWidth: number;
  setSliceWidth: React.Dispatch<React.SetStateAction<number>>;
};

export const VisualController = ({
  effectType,
  setEffectType,
  colorMode,
  setColorMode,
  wireframeMode,
  setWireframeMode,
  displayChecked,
  setDiscplayChecked,
  visualizerChangeChecked,
  setVisualizerChangeChecked,
  strokeColor,
  setstrokeColor,
  lineWidth,
  setLineWidth,
  sliceWidth,
  setSliceWidth,
}: Props) => {
  const [isMinimized, setIsMinimized] = useState(false);
  return (
    <div>
      <button
        data-open={isMinimized ? 'close' : 'open'}
        className={ButtonStyle}
        title='minimize'
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div
          data-open={isMinimized ? 'close' : 'open'}
          className={PlusMinus}
        ></div>
        <p>Visual Control</p>
      </button>
      <div className={WrapperStyle} data-open={isMinimized ? 'close' : 'open'}>
        {visualizerChangeChecked ? (
          <>
            <div className={BoxStyle}>
              <label htmlFor='type'>Effect Type</label>
              <RadioInput
                type='radio'
                onChange={setEffectType}
                selectedValue={effectType}
                name='type'
                values={[
                  { name: 'plate', value: 0 },
                  { name: 'wavy', value: 1 },
                  { name: 'pyramid', value: 2 },
                ]}
              />
            </div>
            <div className={BoxStyle}>
              <label htmlFor='color'>Color Mode</label>
              <RadioInput
                type='radio'
                onChange={setColorMode}
                selectedValue={colorMode}
                name='color'
                values={[
                  { name: 'Default', value: 0 },
                  { name: 'T-based', value: 1 },
                  { name: 'gl-Frag', value: 2 },
                ]}
              />
            </div>
            <div className={BoxStyle}>
              <label htmlFor='wireframe'>Wireframe</label>
              <RadioInput
                type='checkbox'
                onChange={(_) => {
                  if (wireframeMode) {
                    setWireframeMode(0);
                  } else {
                    setWireframeMode(1);
                  }
                }}
                selectedValue={wireframeMode}
                name='wireframe'
                values={[{ name: 'on', value: 0 }]}
              />
            </div>
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              gap: '5rem',
              alignItems: 'center',
              width: '100%',
              paddingRight: '16px',
            }}
          >
            <div className={BoxStyle}>
              <label htmlFor='type'>color</label>
              <ColorInput
                value={strokeColor}
                onChange={(value) => setstrokeColor(value)}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '100%',
              }}
            >
              <div
                className={BoxStyle}
                style={{ marginBottom: '10px', flexGrow: 1 }}
              >
                <RangeInputComponent
                  as='Volume'
                  label='lineWidth'
                  min={0.1}
                  max={10}
                  step={0.1}
                  setValue={setLineWidth}
                  value={lineWidth}
                  nomalValueLabel
                />
              </div>
              <div
                className={BoxStyle}
                style={{ marginBottom: '10px', flexGrow: 1 }}
              >
                <RangeInputComponent
                  as='Volume'
                  label='sliceWidth'
                  min={1}
                  max={100}
                  step={0.1}
                  setValue={setSliceWidth}
                  value={sliceWidth}
                  nomalValueLabel
                />
              </div>
            </div>
          </div>
        )}
        <div className={BoxStyle}>
          <ToggleSwitch
            id='display'
            checked={displayChecked}
            setChecked={setDiscplayChecked}
          />
          <ToggleSwitch
            id='displayChange'
            checked={visualizerChangeChecked}
            setChecked={setVisualizerChangeChecked}
            checkedIcon={<IconCube size={18} />}
            uncheckedIcon={<IconPerspective size={18} />}
          />
        </div>
      </div>
    </div>
  );
};
