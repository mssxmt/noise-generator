// /**
//  * ストレージマネージャー
//  *
//  * このモジュールは生成されたノイズデータの保存と取得を管理します。
//  */
import Dexie from 'dexie';
import { NoiseType, NoiseOptions } from './noiseGenerators';

export type StoredNoise = {
  id: string;
  type: NoiseType;
  options: NoiseOptions;
  data: number[];
  createdAt: Date;
};

/**
 * Dexie.jsを使用してノイズデータを格納するためのデータベースクラス。
 */
class NoiseDatabase extends Dexie {
  noises!: Dexie.Table<StoredNoise, string>;

  constructor() {
    super('NoiseDatabase');
    this.version(1).stores({
      noises: '++id, type, createdAt',
    });
  }
}

const db = new NoiseDatabase();

const MAX_STORED_NOISES = 16;

/**
 * ノイズデータをデータベースに保存します。
 * @param {Omit<StoredNoise, 'id' | 'createdAt'>} noise - 保存するノイズデータ。
 * @returns {Promise<StoredNoise>} 保存されたノイズデータ（IDと作成日時を含む）。
 */
export const saveNoise = async (
  noise: Omit<StoredNoise, 'id' | 'createdAt'>
): Promise<StoredNoise> => {
  const newNoise: StoredNoise = {
    ...noise,
    createdAt: new Date(),
    id: Date.now().toString(),
  };

  const count = await db.noises.count();
  if (count >= MAX_STORED_NOISES) {
    const oldestNoise = await db.noises.orderBy('createdAt').first();
    if (oldestNoise && oldestNoise.id) {
      await db.noises.delete(oldestNoise.id);
    }
  }

  const id = await db.noises.add(newNoise);
  return { ...newNoise };
};

/**
 * 保存されているすべてのノイズデータを取得します。
 * @returns {Promise<StoredNoise[]>} 保存されているすべてのノイズデータの配列。
 */
export const getStoredNoises = async (): Promise<StoredNoise[]> => {
  return await db.noises.orderBy('createdAt').reverse().toArray();
};

/**
 * 指定されたIDのノイズデータを削除します。
 * @param {string} id - 削除するノイズデータのID。
 * @returns {Promise<void>}
 */
export const deleteNoise = async (id: string): Promise<void> => {
  await db.noises.delete(id);
};

/**
 * 保存されているすべてのノイズデータを削除します。
 * @returns {Promise<void>}
 */
export const clearAllNoises = async (): Promise<void> => {
  await db.noises.clear();
};
