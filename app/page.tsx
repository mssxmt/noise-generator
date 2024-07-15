import { ClientWrapper } from '@/components/ClientWrapper/ClientWrapper';
import { NoiseGenerator } from '@/components/NoiseGenerator/NoiseGenerator';

export default function Home() {
  return (
    <main>
      <h1>ノイズジェネレーター</h1>
      <NoiseGenerator>
        <ClientWrapper />
      </NoiseGenerator>
    </main>
  );
}
