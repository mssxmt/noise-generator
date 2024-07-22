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

export const getStoredNoises = async (): Promise<StoredNoise[]> => {
  return await db.noises.orderBy('createdAt').reverse().toArray();
};

export const deleteNoise = async (id: string): Promise<void> => {
  await db.noises.delete(id);
};

export const clearAllNoises = async (): Promise<void> => {
  await db.noises.clear();
};
