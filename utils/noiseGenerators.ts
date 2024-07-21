/**
 * ノイズジェネレーターユーティリティ
 *
 * このモジュールは様々な種類のノイズを生成する関数を提供します。
 * 各ノイズ生成関数は純粋関数として実装され、副作用を持ちません。
 */

// ノイズタイプの定義
// export type NoiseType = 'white' | 'pink' | 'brown' | 'perlin' | 'crackle';
export type NoiseType =
  | 'white'
  | 'pink'
  | 'brown'
  | 'perlin'
  | 'crackle'
  | 'square'
  | 'plus'
  | 'sawtooth';

// ノイズ生成のオプション
export type NoiseOptions = {
  duration: number; // 秒単位
  sampleRate: number;
  volume: number; // 0 to 1
};

// ノイズ生成関数の型
type NoiseGenerator = (options: NoiseOptions) => Float32Array;

/**
 * ホワイトノイズを生成する
 * 全ての周波数が均等に分布したランダムなノイズを生成します。
 */
const generateWhiteNoise: NoiseGenerator = ({
  duration,
  sampleRate,
  volume,
}) => {
  const bufferSize = duration * sampleRate;
  return Float32Array.from(
    { length: bufferSize },
    () => (Math.random() * 2 - 1) * volume
  );
};

/**
 * ピンクノイズを生成する
 * 低周波数がより強調された自然な音のノイズを生成します。
 */
const generatePinkNoise: NoiseGenerator = ({
  duration,
  sampleRate,
  volume,
}) => {
  const bufferSize = duration * sampleRate;
  const b = [0, 0, 0, 0, 0, 0, 0];
  const calculateSample = (white: number) => {
    b[0] = 0.99886 * b[0] + white * 0.0555179;
    b[1] = 0.99332 * b[1] + white * 0.0750759;
    b[2] = 0.969 * b[2] + white * 0.153852;
    b[3] = 0.8665 * b[3] + white * 0.3104856;
    b[4] = 0.55 * b[4] + white * 0.5329522;
    b[5] = -0.7616 * b[5] - white * 0.016898;
    const pink =
      b[0] + b[1] + b[2] + b[3] + b[4] + b[5] + b[6] + white * 0.5362;
    b[6] = white * 0.115926;
    return pink * 0.11 * volume;
  };
  return Float32Array.from({ length: bufferSize }, () =>
    calculateSample(Math.random() * 2 - 1)
  );
};

/**
 * ブラウンノイズを生成する
 * さらに低周波数が強調された深い音のノイズを生成します。
 */
const generateBrownNoise: NoiseGenerator = ({
  duration,
  sampleRate,
  volume,
}) => {
  const bufferSize = duration * sampleRate;
  let lastOut = 0;
  const calculateSample = () => {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.02 * white) / 1.02;
    return lastOut * 3.5 * volume;
  };
  return Float32Array.from({ length: bufferSize }, calculateSample);
};

/**
 * パーリンノイズを生成する（簡略化バージョン）
 * 滑らかで自然な変化を持つノイズを生成します。
 */
const generatePerlinNoise: NoiseGenerator = ({
  duration,
  sampleRate,
  volume,
}) => {
  const bufferSize = duration * sampleRate;
  const noise = new Float32Array(bufferSize);
  const permutation = Array.from({ length: 256 }, () =>
    Math.floor(Math.random() * 256)
  );
  const p = new Uint8Array(512);

  for (let i = 0; i < 512; i++) {
    p[i] = permutation[i % 256];
  }

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t: number, a: number, b: number) => a + t * (b - a);
  const grad = (hash: number, x: number) => {
    const h = hash & 15;
    const grad = 1 + (h & 7);
    return (h & 8 ? -grad : grad) * x;
  };

  const perlin = (x: number) => {
    const X = Math.floor(x) & 255;
    x -= Math.floor(x);
    const u = fade(x);
    const a = p[X];
    const b = p[X + 1];

    return lerp(u, grad(a, x), grad(b, x - 1));
  };

  for (let i = 0; i < bufferSize; i++) {
    const t = i / sampleRate;
    noise[i] = perlin(t * 5) * volume;
  }

  return noise;
};

/**
 * クラックルノイズを生成する
 * 不規則でパチパチとした音のノイズを生成します。
 */
const generateGlitchNoise: NoiseGenerator = ({
  duration,
  sampleRate,
  volume,
}) => {
  const bufferSize = duration * sampleRate;
  const noise = new Float32Array(bufferSize);
  let lastValue = 0;
  let silenceLength = 0;

  for (let i = 0; i < bufferSize; i++) {
    // Randomly introduce glitches
    if (Math.random() < 0.1) {
      lastValue = (Math.random() * 2 - 1) * volume;
      silenceLength = Math.floor(Math.random() * 10); // Random length of silence
    }

    // Apply silence period
    if (silenceLength > 0) {
      lastValue = 0;
      silenceLength--;
    }

    noise[i] = lastValue;
  }

  return noise;
};

// 承知しました。C0の音程（約16.35 Hz）で矩形波、正弦波、ノコギリ波を追加しましょう。まず、NoiseTypeを拡張し、新しい関数を追加します。以下のようにnoiseGenerators.tsファイルを更新してください：
// typescriptCopy// ノイズタイプの定義を拡張
// export type NoiseType = 'white' | 'pink' | 'brown' | 'perlin' | 'crackle' | 'square' | 'sine' | 'sawtooth';

// ... 既存のコード ...

/**
 * C0の周波数（約16.35 Hz）
 */
const C0_FREQUENCY = 16.35 * 4;

/**
 * 矩形波を生成する
 */
const generateSquareWave: NoiseGenerator = ({
  duration,
  sampleRate,
  volume,
}) => {
  const bufferSize = duration * sampleRate;
  const period = sampleRate / C0_FREQUENCY;
  return Float32Array.from(
    { length: bufferSize },
    (_, i) => (Math.floor((i % period) / (period / 2)) * 2 - 1) * volume
  );
};

/**
 * 正弦波を生成する
 */
const generatePulseWave: NoiseGenerator = ({
  duration,
  sampleRate,
  volume,
}) => {
  // const bufferSize = duration * sampleRate;
  // return Float32Array.from(
  //   { length: bufferSize },
  //   (_, i) => Math.sin((2 * Math.PI * C0_FREQUENCY * i) / sampleRate) * volume
  // );
  const bufferSize = duration * sampleRate;
  const period = sampleRate / (C0_FREQUENCY * 16);
  const dutyRatio = 0.05; // 10%のデューティ比（この値を小さくするとよりシャープな「ピー」音になります）
  return Float32Array.from(
    { length: bufferSize },
    (_, i) => ((i % period) / period < dutyRatio ? 1 : -1) * volume
  );
};

/**
 * ノコギリ波を生成する
 */
const generateSawtoothWave: NoiseGenerator = ({
  duration,
  sampleRate,
  volume,
}) => {
  const bufferSize = duration * sampleRate;
  const period = sampleRate / C0_FREQUENCY;
  return Float32Array.from(
    { length: bufferSize },
    (_, i) => (((i % period) / period) * 2 - 1) * volume
  );
};

/**
 * メインのノイズ生成関数
 * 指定されたタイプとオプションに基づいて適切なノイズを生成します。
 */
export const generateNoise = (
  type: NoiseType,
  options: NoiseOptions
): Float32Array => {
  const generators: Record<NoiseType, NoiseGenerator> = {
    white: generateWhiteNoise,
    pink: generatePinkNoise,
    brown: generateBrownNoise,
    perlin: generatePerlinNoise,
    crackle: generateGlitchNoise,
    square: generateSquareWave,
    plus: generatePulseWave,
    sawtooth: generateSawtoothWave,
  };

  const generator = generators[type];

  if (!generator) {
    throw new Error(`Unsupported noise type: ${type}`);
  }

  return generator(options);
};
