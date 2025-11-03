import { StoredNoise } from '@/utils/storageManager';
import { css } from '@kuma-ui/core';
import {
  IconArrowBadgeRight,
  IconKeyboard,
  IconRun,
  IconTrash,
} from '@tabler/icons-react';

const Button = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  outline: none;
  border: none;
  width: 5rem;
  height: 2rem;
  border-radius: 1rem;
  box-shadow: t('colors.shadow');
  background-color: t('colors.grey.light1');

  cursor: pointer;
  transition: 0.3s ease;
  text-align: center;

  color: t('colors.grey.dark');
  &:hover {
    color: t('colors.alert.success');
    box-shadow: t('colors.shadowHover');
  }
  &:active {
    box-shadow: t('colors.alert.success');
  }
`;

const ButtonDelete = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  outline: none;
  border: none;
  width: 5rem;
  height: 2rem;
  border-radius: 1rem;
  box-shadow: t('colors.shadow');
  background-color: t('colors.grey.light1');

  cursor: pointer;
  transition: 0.3s ease;
  text-align: center;

  color: t('colors.grey.dark');
  &:hover {
    color: t('colors.alert.warning');
    box-shadow: t('colors.shadowHover');
  }
  &:active {
    box-shadow: t('colors.alert.warning');
  }
`;

const Ul = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  width: 100%;
  box-shadow: t('colors.shadow');
  min-height: 0;
  border-radius: 1rem;
`;

const Li = css`
  border: none;
  width: 100%;
  height: 3rem;
  border-radius: 1rem;
  background-color: transparent; //t('colors.grey.light1');
  padding: 0 16px;
  box-shadow: t('colors.innerShadow');
  color: t('colors.primary.default');
  display: grid;
  align-items: center; /* グリッドのアイテムを上下中央に配置 */
  justify-content: center; /* グリッドのアイテムを左右中央に配置 */
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

type Props = {
  storedNoises: StoredNoise[];
  handlePlayStored: (noise: StoredNoise) => void;
  handleDeleteNoise: (id: string) => void;
  keyMapping: string[];
  selectedId: string;
};

/**
 * 保存されたノイズをリスト形式で表示し、再生、削除するためのコンポーネント。
 * @param {Props} props - コンポーネントのプロパティ。
 * @param {StoredNoise[]} props.storedNoises - 保存されているノイズの配列。
 * @param {(noise: StoredNoise) => void} props.handlePlayStored - 保存されたノイズを再生する関数。
 * @param {(id: string) => void} props.handleDeleteNoise - 保存されたノイズを削除する関数。
 * @param {string[]} props.keyMapping - キーボードマッピングの配列。
 * @param {string} props.selectedId - 現在選択されているノイズのID。
 * @returns {JSX.Element} - 保存されたノイズのリスト。
 */
export const SavedList = ({
  storedNoises,
  handlePlayStored,
  handleDeleteNoise,
  keyMapping,
  selectedId,
}: Props) => {
  return (
    <ul
      className={Ul}
      style={{
        height: `calc(50px * ${storedNoises.length})`,
        padding: `${storedNoises.length ? '24px' : '0'}`,
        transition: 'all 0.3s ease',
      }}
    >
      {storedNoises.map((noise, index) => (
        <li key={noise.id} className={Li}>
          <p>
            {noise.type} - {noise.options.duration}s
          </p>
          <button
            className={Button}
            style={{
              color:
                selectedId === noise.id ? 'var(--success)' : 'var(--greyDark)',
            }}
            onClick={() => handlePlayStored(noise)}
          >
            PLAY <IconRun size={16} />
          </button>
          <button
            className={ButtonDelete}
            onClick={() => handleDeleteNoise(noise.id)}
          >
            DEL <IconTrash size={16} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconKeyboard size={24} />
            <IconArrowBadgeRight size={16} />
            <p>{keyMapping[index]}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
