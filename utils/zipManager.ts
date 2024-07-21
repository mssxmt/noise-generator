import JSZip from 'jszip';

export const createZip = async (
  files: { name: string; data: Blob }[]
): Promise<Blob> => {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.name, file.data);
  });

  return await zip.generateAsync({ type: 'blob' });
};

export const downloadZip = (zipBlob: Blob, fileName: string) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(zipBlob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
