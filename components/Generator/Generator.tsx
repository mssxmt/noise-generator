'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  generateNoise,
  NoiseType,
  NoiseOptions,
} from '@/utils/noiseGenerators';
import { playAudio, stopAudio } from '@/utils/audioUtils';
import {
  saveNoise,
  getStoredNoises,
  deleteNoise,
  StoredNoise,
} from '@/utils/storageManager';
import WaveformDisplay from '../WaveformDisplay/WaveformDisplay';
import DownloadManager from '../DownloadManager/DownloadManager';
import { css } from '@kuma-ui/core';
import { SavedList } from './SavedList';
import { ToggleSwitch } from '../ToggleSwitchComponent';
import { DeleteAll } from './DeleteAll';
import { keyMapping } from '@/utils/keyMappting';
import WaveformDisplayThree from '../WaveformDisplay/AudioVisualizer';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';
import { SavedGridList } from './SavedGridList';
import { SoundController } from '../SoundController/SoundController';
import { VisualController } from '../VisualController/VisualController';

const Label = css`
  border: none;
  width: fit-content;
  height: 2rem;
  border-radius: 1rem;
  color: t('colors.grey.dark');
  background-color: transparent; //t('colors.grey.light1');
  padding: 8px 16px;
  box-shadow: t('colors.shadowHover');
  color: t('colors.primary.primary');
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Generator: React.FC = () => {
  const [noiseType, setNoiseType] = useState<NoiseType>('white');
  const [duration, setDuration] = useState(0.5);
  const [volume, setVolume] = useState(0.1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [storedNoises, setStoredNoises] = useState<StoredNoise[]>([]); //表示用のstate
  const [audioData, setAudioData] = useState<Float32Array | null>(null);
  const [displayChecked, setDiscplayChecked] = useState(true);
  const [visualizerChangeChecked, setVisualizerChangeChecked] = useState(false);
  const [displayPad_ListChecked, setDisplayPad_ListChecked] = useState(true);
  const [selectedId, setSelectedId] = useState<string>('');
  const [effectType, setEffectType] = useState(0);
  const [colorMode, setColorMode] = useState(0);
  const [wireframeMode, setWireframeMode] = useState(0);
  const [strokeColor, setstrokeColor] = useState('#6b7a9a');
  const [lineWidth, setLineWidth] = useState(0.5);
  const [sliceWidth, setSliceWidth] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const loadInitialStoredNoises = async () => {
    const initialStoredNoises = await getStoredNoises();
    setStoredNoises(initialStoredNoises);
  };

  useEffect(() => {
    loadInitialStoredNoises();
  }, []);

  const handleGenerateAndPlay = useCallback(
    async ({ isPreview }: { isPreview: boolean }) => {
      const options: NoiseOptions = {
        duration,
        sampleRate: 44100,
        volume,
      };

      const noiseData = generateNoise(noiseType, options);

      if (isPreview) {
        setIsPlaying(true);
        playAudio(noiseData, volume);

        // 再生が終了したら状態を更新
        setTimeout(() => {
          setIsPlaying(false);
          stopAudio();
        }, duration * 1000);
      }

      if (!isPreview) {
        // ノイズを保存
        const savedNoise = await saveNoise({
          type: noiseType,
          options,
          data: Array.from(noiseData), // Float32Arrayを通常の配列に変換
        });
        // stateの配列に加える
        if (storedNoises.length <= 16) {
          setStoredNoises((prevNoises) => [...prevNoises, savedNoise]);
        }
      }
    },
    [duration, volume, noiseType, storedNoises.length]
  );

  const handleStop = useCallback(() => {
    stopAudio();
    setIsPlaying(false);
  }, []);

  const handleDeleteNoise = useCallback(
    async (id: string) => {
      await deleteNoise(id);
      const updatedNoises = storedNoises.filter((noise) => noise.id !== id);
      setStoredNoises(updatedNoises);
    },
    [storedNoises]
  );

  const handlePlayStored = useCallback((noise: StoredNoise) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    const noiseData = new Float32Array(noise.data);
    setAudioData(noiseData);
    playAudio(noiseData, noise.options.volume);

    setSelectedId(noise.id);
    const duration =
      noise.options.duration < 0.1 ? 0.1 : noise.options.duration;
    timerRef.current = setTimeout(() => {
      setSelectedId('');
    }, duration * 1000);
  }, []);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const index = keyMapping.indexOf(event.key.toLowerCase());
      if (index !== -1 && index < storedNoises.length) {
        handlePlayStored(storedNoises[index]);
      }
    },
    [handlePlayStored, storedNoises]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <SoundController
        {...{
          noiseType,
          setNoiseType,
          isPlaying,
          handleGenerateAndPlay,
          handleStop,
          duration,
          setDuration,
          volume,
          setVolume,
        }}
      />
      <VisualController
        {...{
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
        }}
      />

      <section
        style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
            }}
          >
            <h3 className={Label}>SAVED SOUND(S)</h3>
            <ToggleSwitch
              id='displayPad_List'
              checked={displayPad_ListChecked}
              setChecked={setDisplayPad_ListChecked}
              checkedIcon={<IconLayoutGrid size={18} />}
              uncheckedIcon={<IconLayoutList size={18} />}
            />
          </div>

          {displayPad_ListChecked ? (
            <SavedGridList
              storedNoises={storedNoises}
              handlePlayStored={handlePlayStored}
              handleDeleteNoise={handleDeleteNoise}
              keyMapping={keyMapping}
              selectedId={selectedId}
            />
          ) : (
            <SavedList
              storedNoises={storedNoises}
              handlePlayStored={handlePlayStored}
              handleDeleteNoise={handleDeleteNoise}
              keyMapping={keyMapping}
              selectedId={selectedId}
            />
          )}
        </div>
        <DeleteAll
          storedNoises={storedNoises}
          setStoredNoises={setStoredNoises}
        />
      </section>
      <div
        style={{
          display: 'flex',
        }}
      >
        <DownloadManager noiseFiles={storedNoises} />
      </div>
      <div
        style={{
          width: displayChecked ? '0' : '100%',
          aspectRatio: '2 / 1',
          backgroundColor: 'transparent',
          boxShadow: displayChecked ? 'none' : 'var(--var-shadow)',
          borderRadius: displayChecked ? '0' : '1rem',
        }}
      >
        {/* {audioData && ( */}
        <>
          {visualizerChangeChecked ? (
            <WaveformDisplayThree
              audioData={audioData}
              sampleRate={44100}
              volume={volume}
              displayChecked={displayChecked}
              effectType={effectType}
              colorMode={colorMode}
              wireframeMode={wireframeMode}
            />
          ) : (
            <WaveformDisplay
              audioData={audioData}
              volume={volume}
              displayChecked={displayChecked}
              strokeColor={strokeColor}
              lineWidth={lineWidth}
              sliceWidth={sliceWidth}
            />
          )}
        </>
        {/* )} */}
      </div>
    </section>
  );
};
