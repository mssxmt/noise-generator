export const numberArrayToFloat32Array = (array: number[]): Float32Array => {
  return new Float32Array(array);
};

export const createWavFile = (
  audioData: Float32Array,
  sampleRate: number
): Blob => {
  const numberOfChannels = 1; // モノラル
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;

  // WAVファイルのヘッダーを作成
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  // "RIFF" チャンク記述子
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + audioData.length * bytesPerSample, true);
  writeString(view, 8, 'WAVE');

  // "fmt " サブチャンク
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM フォーマット
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numberOfChannels * bytesPerSample, true);
  view.setUint16(32, numberOfChannels * bytesPerSample, true);
  view.setUint16(34, bitsPerSample, true);

  // "data" サブチャンク
  writeString(view, 36, 'data');
  view.setUint32(40, audioData.length * bytesPerSample, true);

  // オーディオデータを Int16Array に変換
  const samples = new Int16Array(audioData.length);
  for (let i = 0; i < audioData.length; i++) {
    const sample = Math.max(-1, Math.min(1, audioData[i]));
    samples[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }

  // ヘッダーとオーディオデータを結合
  const wavFile = new Blob([header, samples.buffer], { type: 'audio/wav' });
  return wavFile;
};

const writeString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};
