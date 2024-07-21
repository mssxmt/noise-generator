/**
 * オーディオユーティリティ
 *
 * このモジュールはWeb Audio APIを使用して、
 * 音声データの再生や操作に関する機能を提供します。
 */

// AudioContextのグローバルインスタンス
let audioContext: AudioContext | null = null;

/**
 * AudioContextを取得または作成します。
 * ブラウザの制限により、ユーザーインタラクション後に初期化する必要があります。
 */
const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
  }
  return audioContext;
};

/**
 * 音声データを再生します。
 * @param audioData 再生する音声データ（Float32Array）
 * @param volume 音量（0-1の範囲）
 * @returns 再生を停止するための関数
 */
export const playAudio = (
  audioData: Float32Array,
  volume: number = 1
): (() => void) => {
  const context = getAudioContext();
  const buffer = context.createBuffer(1, audioData.length, context.sampleRate);
  buffer.getChannelData(0).set(audioData);

  const source = context.createBufferSource();
  source.buffer = buffer;

  const gainNode = context.createGain();
  gainNode.gain.setValueAtTime(volume, context.currentTime);

  source.connect(gainNode);
  gainNode.connect(context.destination);

  source.start();

  return () => {
    source.stop();
    source.disconnect();
    gainNode.disconnect();
  };
};

/**
 * 現在再生中の音声を停止します。
 */
export const stopAudio = (): void => {
  if (audioContext) {
    audioContext.close().then(() => {
      audioContext = null;
    });
  }
};
