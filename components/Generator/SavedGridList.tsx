import { StoredNoise } from '@/utils/storageManager';
import { css } from '@kuma-ui/core';
import { IconRun } from '@tabler/icons-react';

const Button = css`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  outline: none;
  border: none;
  width: 100%;
  aspect-ratio: 1 / 1;
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
    box-shadow: 0 0 0 0rem;
  }
`;

const Ul = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    'item13 item14 item15 item16'
    'item9 item10 item11 item12'
    'item5 item6 item7 item8'
    'item1 item2 item3 item4';
  justify-content: center;
  height: fit-content;
  gap: 16px;
  width: 100%;
  padding: 1rem;
  box-shadow: t('colors.innerShadow');
  border-radius: 1rem;

  @media screen and (max-width: 700px) {
    gap: 8px;
    padding: 0.5rem;
  }
`;

const Span = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

type Props = {
  storedNoises: StoredNoise[];
  handlePlayStored: (noise: StoredNoise) => void;
  handleDeleteNoise: (id: string) => void;
  keyMapping: string[];
  selectedId: string;
};
export const SavedGridList = ({
  storedNoises,
  handlePlayStored,
  handleDeleteNoise,
  keyMapping,
  selectedId,
}: Props) => {
  const GRID = Array.from({ length: 16 }, (_, i) => {
    return { id: i };
  });

  return (
    <ul className={Ul} id='container'>
      {GRID.map((item, index) => {
        const storedNoise = storedNoises[index];
        return (
          <li
            key={item.id}
            style={{
              gridArea: `item${index + 1}`,
            }}
          >
            <button
              className={Button}
              style={{
                color:
                  selectedId === storedNoise?.id
                    ? 'var(--success)'
                    : 'var(--greyDark)',
                boxShadow:
                  selectedId === storedNoise?.id
                    ? '0 0 0 0rem rgba(255, 251, 0, 1)'
                    : 'var(--var-shadow)',
                backgroundColor:
                  selectedId === storedNoise?.id
                    ? 'rgba(255, 251, 0, 0.1)'
                    : 'transparent',
              }}
              onClick={() =>
                storedNoise ? handlePlayStored(storedNoise) : null
              }
            >
              {storedNoise ? (
                <>
                  <p>
                    {storedNoise?.type} - {storedNoise?.options.duration}s
                  </p>
                  <span className={Span}>
                    PLAY <IconRun size={16} />
                  </span>
                </>
              ) : (
                'not assigned'
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
