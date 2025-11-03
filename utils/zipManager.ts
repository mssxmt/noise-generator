import JSZip from 'jszip';

/**
 * ファイルの配列からZIPファイルのBlobを作成します。
 * @param {({ name: string; data: Blob })[]} files - ZIPファイルに追加するファイルの配列。
 * @returns {Promise<Blob>} ZIPファイルのBlob。
 */
export const createZip = async (
  files: { name: string; data: Blob }[]
): Promise<Blob> => {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.name, file.data);
  });

  return await zip.generateAsync({ type: 'blob' });
};

/**
 * ZIPファイルのBlobをダウンロードします。
 * @param {Blob} zipBlob - ダウンロードするZIPファイルのBlob。
 * @param {string} fileName - ダウンロードするファイルの名前。
 */
export const downloadZip = (zipBlob: Blob, fileName:string) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(zipBlob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
