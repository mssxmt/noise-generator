import { MetadataRoute } from 'next';

/**
 * sitemap.xmlファイルを生成するための関数。
 * @returns {MetadataRoute.Sitemap} - sitemap.xmlの設定オブジェクト。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://noise-xenerator.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];
}
