import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { KumaRegistry } from '@kuma-ui/next-plugin/registry';
import { ThemeProvider } from '@/providers/NextThmesProvider';
import { Header } from '@/components/Header';
import { ThemeToggle } from '@/components/ThemeToggle';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Noise Generator',
  description: 'Generate various types of noise',
};

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
