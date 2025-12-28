'use client';

import React, { useRef, useEffect, useState } from 'react';
// import styles from './WaveformDisplay.css';

/**
 * @interface WaveformDisplayProps
 * @description WaveformDisplayコンポーネントのプロパティを定義します。
 * @property {Float32Array | null} audioData - 表示するオーディオデータ。
 * @property {number} volume - オーディオの音量。
 * @property {boolean} displayChecked - 表示がチェックされているかどうか。
 * @property {string} strokeColor - 波形の色。
 * @property {number} lineWidth - 波形の線の幅。
 * @property {number} sliceWidth - 波形のスライスの幅。
 */
interface WaveformDisplayProps {
  audioData: Float32Array | null; // オーディオデータ
  volume: number; // 音量
  displayChecked: boolean;
  strokeColor: string;
  lineWidth: number;
  sliceWidth: number;
}

/**
 * オーディオデータの波形をキャンバスに描画するコンポーネント。
 * @param {WaveformDisplayProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} - 波形表示用のキャンバス要素。
 */
const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
  audioData,
  volume,
  displayChecked,
  strokeColor,
  lineWidth,
  sliceWidth: SW,
}) => {
  // Canvas element ref
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Reuse AudioContext and AnalyserNode across renders
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Animation frame ID ref
  const animationFrameId = useRef<number | null>(null);

  // Cache computed styles to avoid DOM access in animation loop
  const [cachedStyles, setCachedStyles] = useState({ fillColor: '' });

  // Initialize cached styles on mount (client-side only)
  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setCachedStyles({
      fillColor: rootStyles.getPropertyValue('--greyLight-1'),
    });
  }, []);

  // Setup and draw waveform
  useEffect(() => {
    if (!canvasRef.current || !audioData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create AudioContext and AnalyserNode only once
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext ||
        (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
    }

    const audioCtx = audioContextRef.current;
    const analyser = analyserRef.current;

    if (!analyser) return;

    // Create buffer from audio data
    const buffer = audioCtx.createBuffer(1, audioData.length, audioCtx.sampleRate);
    buffer.getChannelData(0).set(audioData);

    // Create and configure source
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

    source.connect(gainNode);
    gainNode.connect(analyser);
    // Don't connect to destination to avoid playing sound

    source.start();

    // Data array for analyzer
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Draw function
    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      analyser.getByteTimeDomainData(dataArray);

      // Use cached styles instead of accessing DOM
      ctx.fillStyle = cachedStyles.fillColor;
      ctx.fillRect(0, 0, width, height);

      // Draw waveform
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = strokeColor;
      ctx.beginPath();

      const sliceWidth = (width * SW) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Request next frame
      const newAnimationFrameId = requestAnimationFrame(draw);
      animationFrameId.current = newAnimationFrameId;
    };

    draw();

    // Cleanup function
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      try {
        source.stop();
        source.disconnect();
        gainNode.disconnect();
      } catch (e) {
        // Source may already be stopped
      }
      // Don't close context - keep it alive for reuse
    };
  }, [audioData, volume, lineWidth, strokeColor, SW, cachedStyles.fillColor]);

  // canvas 要素のレンダリング
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: displayChecked ? 'absolute' : 'relative',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-1',
        transition: 'all 0.3s ease',
      }}
    />
  );
};

export default WaveformDisplay;
