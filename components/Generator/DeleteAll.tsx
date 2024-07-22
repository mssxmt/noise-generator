import { clearAllNoises, StoredNoise } from '@/utils/storageManager';
import { css } from '@kuma-ui/core';
import { IconTrash } from '@tabler/icons-react';

const Button = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  outline: none;
  border: none;
  width: fit-content;
  height: 2rem;
  padding: 8px 16px;
  border-radius: 1rem;
  box-shadow: t('colors.shadow');
  background-color: transparent; //t('colors.grey.light1');
  cursor: pointer;
  transition: 0.3s ease;

  color: t('colors.grey.dark');
  &:hover {
    color: t('colors.alert.error');
    box-shadow: t('colors.shadowHover');
  }
  &:active {
    box-shadow: t('colors.alert.error');
  }

  &:hover {
    > span {
      animation: gatagata 0.5s infinite;
    }
    @keyframes gatagata {
      0% {
        transform: translateY(0);
      }
      25% {
        transform: translate(1px, 0px) rotateZ(2deg);
      }
      50% {
        transform: translate(0px, 0px) rotateZ(0deg);
      }
      75% {
        transform: translate(-1px, 0px) rotateZ(-2deg);
      }
      100% {
        transform: translate(0px, 0px) rotateZ(0deg);
      }
    }
  }
`;
type Props = {
  storedNoises: StoredNoise[];
  setStoredNoises: (StoredNoise: StoredNoise[]) => void;
};
export const DeleteAll = ({ setStoredNoises, storedNoises }: Props) => {
  return (
    storedNoises.length !== 0 && (
      <button
        className={Button}
        onClick={() => {
          setStoredNoises([]);
          clearAllNoises();
        }}
      >
        DELETE ALL
        {storedNoises.map((noise) => (
          <span key={noise.id}>
            <IconTrash />
          </span>
        ))}
      </button>
    )
  );
};
