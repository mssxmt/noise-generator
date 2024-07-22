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
import NoiseList from './NoiseList';
import RangeInputComponent from './RangeInput';
const keyMapping = [
  'a',
  'w',
  's',
  'e',
  'd',
  'f',
  't',
  'g',
  'y',
  'h',
  'u',
  'j',
  'k',
  'o',
  'l',
  'p',
];

export const Generator: React.FC = () => {
  const initialStoredNoises = getStoredNoises();
  const [noiseType, setNoiseType] = useState<NoiseType>('white');
  const [duration, setDuration] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [storedNoises, setStoredNoises] =
    useState<StoredNoise[]>(initialStoredNoises); //表示用のstate
  const [audioData, setAudioData] = useState<Float32Array | null>(null);
const [displayChecked, setDiscplayChecked] = useState(false);

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

    setIsPlaying(true);
    const stopPlayback = playAudio(noiseData, volume);

    // 再生が終了したら状態を更新
    setTimeout(() => {
      setIsPlaying(false);
      stopPlayback();
    }, duration * 1000);

    // ノイズを保存
        const savedNoise = await saveNoise({
      type: noiseType,
      options,
      data: Array.from(noiseData), // Float32Arrayを通常の配列に変換
    });
    // stateの配列に加える
    setStoredNoises((prevNoises) => [...prevNoises, savedNoise]);
  }, [noiseType, duration, volume]);

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
    const noiseData = new Float32Array(noise.data);
    setAudioData(noiseData);
    playAudio(noiseData, noise.options.volume);
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <NoiseList noiseType={noiseType} setNoiseType={setNoiseType} />
<ControlButtons
          isPlaying={isPlaying}
          handleGenerateAndPlay={handleGenerateAndPlay}
          handleStop={handleStop}
        />
      </div>
      <div>
        <RangeInputComponent
          as='Duration'
          label='Duration'
          value={duration}
          setValue={setDuration}
          min={0.05}
          max={3}
          step={0.05}
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
          step={0.1}
        />
      </div>
      <section
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <h3 className={Label}>SAVED SOUND(S)</h3>
        <SavedList
          storedNoises={storedNoises}
          handlePlayStored={handlePlayStored}
          handleDeleteNoise={handleDeleteNoise}
          keyMapping={keyMapping}
        />
        <DeleteAll
          storedNoises={storedNoises}
          setStoredNoises={setStoredNoises}
        />
      </section>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
      <DownloadManager noiseFiles={storedNoises} />
      {audioData && (
        <WaveformDisplay
          audioData={audioData}
          sampleRate={44100}
          isPlaying={isPlaying}
          volume={volume}
        />
      )}
    </div>
  );
};
