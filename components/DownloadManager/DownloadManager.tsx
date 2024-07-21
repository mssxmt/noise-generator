import { StoredNoise } from '@/utils/storageManager';
import { createZip, downloadZip } from '@/utils/zipManager';
import {
  createWavFile,
  numberArrayToFloat32Array,
} from '@/utils/wavfileGenerator';

type DownloadManagerProps = {
  noiseFiles: StoredNoise[];
};

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
      <button onClick={handleDownload} disabled={noiseFiles.length === 0}>
        Download All Noise Files
      </button>
    </div>
  );
};

export default DownloadManager;
