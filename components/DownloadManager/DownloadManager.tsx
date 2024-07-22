import { StoredNoise } from '@/utils/storageManager';
import { createZip, downloadZip } from '@/utils/zipManager';
import {
  createWavFile,
  numberArrayToFloat32Array,
} from '@/utils/wavfileGenerator';

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
  const handleDownload = async () => {
    if (noiseFiles.length === 0) {
      alert('No noise files to download');
      return;
    }

    const files = noiseFiles.map((file) => {
      const audioData = numberArrayToFloat32Array(file.data);
      const wavBlob = createWavFile(audioData, file.options.sampleRate);
      return {
        name: `${file.type}_${file.id}.wav`,
        data: wavBlob,
      };
    });

    try {
      const zipBlob = await createZip(files);
      downloadZip(zipBlob, 'noise_files.zip');
    } catch (error) {
      console.error('Error creating zip file:', error);
      alert('Failed to create zip file');
    }
  };

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
