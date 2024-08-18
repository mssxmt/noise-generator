import React, { useRef, useEffect, useState } from 'react';
// import styles from './WaveformDisplay.css';

// インターフェース定義：WaveformDisplay コンポーネントのプロパティ
interface WaveformDisplayProps {
  audioData: Float32Array | null; // オーディオデータ
  volume: number; // 音量
  displayChecked: boolean;
  strokeColor: string;
  lineWidth: number;
  sliceWidth: number;
}

// WaveformDisplay コンポーネントの定義
const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
  audioData,
  volume,
  displayChecked,
  strokeColor,
  lineWidth,
  sliceWidth: SW,
}) => {
  // canvas 要素の参照を保持するための ref を作成
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // AnalyserNode を保持するための state を作成
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  // アニメーションフレームの ID を保持するための state を作成
  const animationFrameId = useRef<number | null>(null);

  // コンポーネントがマウント・アンマウントされた時に実行する処理
  useEffect(() => {
    if (!canvasRef.current) return;
    if (!audioData) return;
    // canvas 要素の取得とコンテキストの作成
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // オーディオコンテキストの作成（ブラウザの互換性を考慮）
    const context = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const newAnalyser = context.createAnalyser();
    newAnalyser.fftSize = 2048; // FFT サイズの設定
    // setAnalyser(newAnalyser);

    // オーディオバッファの作成とデータの設定
    const buffer = context.createBuffer(
      1,
      audioData.length,
      context.sampleRate
    );
    buffer.getChannelData(0).set(audioData);

    // バッファソースの作成
    const source = context.createBufferSource();
    source.buffer = buffer;

    // ゲインノードの作成と音量の設定
    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(volume, context.currentTime);

    // ノードをチェーン状に接続
    source.connect(gainNode);
    gainNode.connect(newAnalyser);
    // `context.destination` に接続しないことで音を鳴らさない
    // newAnalyser.connect(context.destination);

    // オーディオソースの再生開始
    source.start();

    // AnalyserNode のデータを格納する配列の作成
    const bufferLength = newAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 描画関数の定義
    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      newAnalyser.getByteTimeDomainData(dataArray);

      const rootStyles = getComputedStyle(document.documentElement);
      const fillColor = rootStyles.getPropertyValue('--greyLight-1');
      // const strokeColor = rootStyles.getPropertyValue('--greyDark');

      // canvas をクリア
      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, width, height);

      // 波形を描画
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

      // 次のフレームの描画をリクエスト
      const newAnimationFrameId = requestAnimationFrame(draw);
      animationFrameId.current = newAnimationFrameId;
    };

    draw();

    // クリーンアップ関数：アニメーションフレームのキャンセル、オーディオノードの解放
    return () => {
      if (animationFrameId && animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      source.stop();
      source.disconnect();
      gainNode.disconnect();
      newAnalyser.disconnect();
      context.close();
    };
  }, [audioData, volume]);

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
