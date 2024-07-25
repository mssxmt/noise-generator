import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/globals.css';
import { KumaRegistry } from '@kuma-ui/next-plugin/registry';
import { ThemeProvider } from '@/providers/NextThmesProvider';
import { Header } from '@/components/Header';
import { ThemeToggle } from '@/components/ThemeToggle';

const siteName = 'NOISE XENERATOR';
const description = `no problem! Let's generate noise!`;
const url = 'https://noise-xenerator.vercel.app/';

export const metadata: Metadata = {
  // 指定が必要 https://docs.netlify.com/configure-builds/environment-variables/
  metadataBase: new URL('https://noise-xenerator.vercel.app/'),
  description,
  title: {
    default: siteName,
    /** `next-seo`の`titleTemplate`に相当する機能 */
    template: `%s - ${siteName}`,
  },
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    site: '@marip13',
    creator: '@marpi13',
  },
  verification: {
    google: 'サーチコンソール',
  },
  alternates: {
    canonical: url,
  },
};
const exanRegular = localFont({
  src: '../public/fonts/Exan-Regular.ttf',
  variable: '--font-exan',
  display: 'swap',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={exanRegular.variable}>
        <ThemeProvider attribute='data-theme'>
          <Header>
            <ThemeToggle />
          </Header>
          <KumaRegistry>{children}</KumaRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
