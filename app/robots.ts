import { MetadataRoute } from 'next';

/**
 * robots.txtファイルを生成するための関数。
 * @returns {MetadataRoute.Robots} - robots.txtの設定オブジェクト。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://noise-xenerator.vercel.app/',
  };
}
