import Image from 'next/image';

export const NextImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        borderRadius: '1rem',
        overflow: 'hidden',
        padding: '1.5rem',
        boxShadow: 'var(--var-innerShadow)',
      }}
    >
      <Image
        src={`/images/${src}`}
        alt={alt}
        // fill
        width={1980}
        height={1150}
        style={{
          width: '100%',
          height: 'auto',
          //   aspectRatio: '16 / 9',
        }}
        priority
        quality={80}
        decoding='async'
      />
    </div>
  );
};
