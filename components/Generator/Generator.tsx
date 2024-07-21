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

  const handleGenerateAndPlay = useCallback(() => {
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
    const savedNoise = saveNoise({
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
    (id: string) => {
      deleteNoise(id);
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
    <div>
      <h2>ノイズジェネレーター</h2>
      <NoiseList noiseType={noiseType} setNoiseType={setNoiseType} />

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
      {isPlaying ? (
        <button onClick={handleStop}>停止</button>
      ) : (
        <button onClick={handleGenerateAndPlay}>生成して再生</button>
      )}

      <h3>保存されたノイズ</h3>
      <ul>
        {storedNoises.map((noise) => (
          <li key={noise.id}>
            {noise.type} - {noise.options.duration}s
            <button onClick={() => handlePlayStored(noise)}>再生</button>
            <button onClick={() => handleDeleteNoise(noise.id)}>削除</button>
          </li>
        ))}
      </ul>
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
