/**
 * ストレージマネージャー
 *
 * このモジュールは生成されたノイズデータの保存と取得を管理します。
 */

import { NoiseType, NoiseOptions } from './noiseGenerators';

// 保存されるノイズデータの型
export type StoredNoise = {
  id: string;
  type: NoiseType;
  options: NoiseOptions;
  data: number[]; // Float32Arrayは直接JSONに変換できないため、numberの配列として保存
};

const STORAGE_KEY = 'storedNoises';
const MAX_STORED_NOISES = 16;

/**
 * 生成されたノイズをローカルストレージに保存します。
 */
export const saveNoise = (noise: Omit<StoredNoise, 'id'>): StoredNoise => {
  const storedNoises = getStoredNoises();

  // 新しいIDを生成
  const id = Date.now().toString();
  const newNoise: StoredNoise = { ...noise, id };

  // 最大数を超える場合は古いものを削除
  if (storedNoises.length >= MAX_STORED_NOISES) {
    storedNoises.shift();
  }

  storedNoises.push(newNoise);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedNoises));

  return newNoise;
};

/**
 * 保存されたノイズの一覧を取得します。
 */
export const getStoredNoises = (): StoredNoise[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

/**
 * 指定されたIDのノイズを削除します。
 */
export const deleteNoise = (id: string): void => {
  const storedNoises = getStoredNoises().filter((noise) => noise.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedNoises));
};

/**
 * 保存されたすべてのノイズを削除します。
 */
export const clearAllNoises = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
