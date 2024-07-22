import { Generator } from '@/components/Generator/Generator';
import { NoiseGenerator } from '@/components/NoiseGenerator/NoiseGenerator';
import { css } from '@kuma-ui/core';

const Main = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  min-height: 100vh;
  padding: 0 5rem;
  color: t('colors.primary.default');
`;

const Section = css`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export default function Home() {
  return (
    <main className={Main}>
      <section className={Section}>
        <NoiseGenerator>
          <Generator />
        </NoiseGenerator>
      </section>
    </main>
  );
}
