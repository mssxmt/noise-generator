import { StoredNoise } from '@/utils/storageManager';
import { css } from '@kuma-ui/core';
import { handleDownload } from '@/utils/handleDownload';
import { IconArrowDownToArc } from '@tabler/icons-react';

type DownloadManagerProps = {
  noiseFiles: StoredNoise[];
};

const Button = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  outline: none;
  border: none;
  width: fit-content;
  height: 4rem;
  padding: 8px 16px;
  border-radius: 1rem;
  box-shadow: t('colors.shadow');
  background-color: transparent; //t('colors.grey.light1');

  cursor: pointer;
  transition: 0.3s ease;
  text-align: center;

  color: t('colors.grey.dark');
  &:hover:not(:disabled) {
    color: t('colors.primary.default');
    box-shadow: t('colors.shadowHover');
  }
  &:active:not(:disabled) {
    box-shadow: t('colors.innerShadow');
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const DownloadManager: React.FC<DownloadManagerProps> = ({ noiseFiles }) => {
  return (
    <div>
      <button
        onClick={() => handleDownload({ noiseFiles })}
        disabled={noiseFiles.length === 0}
        className={Button}
      >
        Download All WAV Files
        <IconArrowDownToArc size={16} />
      </button>
    </div>
  );
};

export default DownloadManager;
