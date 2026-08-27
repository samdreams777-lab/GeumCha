import { forwardRef, type ImgHTMLAttributes, useState } from 'react';

// Fallback image used when a dish has no photo of its own
export const FALLBACK_DISH_IMAGE = `${import.meta.env.BASE_URL}images/menu/snack-assortment.webp`;

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Full public path to the actual file, e.g. "/images/menu/kimchi-ramen.webp" */
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  aspectRatio?: string; // e.g. "4/3", "16/9", "1/1"
  objectFit?: 'cover' | 'contain' | 'fill';
}

/**
 * Simple responsive image wrapper:
 * - keeps layout stable via aspect-ratio container
 * - lazy-loads by default (eager + high fetchPriority for hero)
 * - falls back to a generic dish photo if the requested file is missing
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      priority = false,
      className = '',
      aspectRatio = '4/3',
      objectFit = 'cover',
      ...props
    },
    ref
  ) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [loaded, setLoaded] = useState(false);

    const containerStyles: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      aspectRatio,
      overflow: 'hidden',
      backgroundColor: '#1B1B1B',
    };

    const imageStyles: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit,
      opacity: loaded ? 1 : 0,
      transition: 'opacity 0.3s ease-out',
    };

    return (
      <div className={className} style={containerStyles}>
        <img
          ref={ref}
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          style={imageStyles}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (currentSrc !== FALLBACK_DISH_IMAGE) {
              setCurrentSrc(FALLBACK_DISH_IMAGE);
            }
          }}
          {...props}
        />
      </div>
    );
  }
);

Image.displayName = 'Image';

// Hero background component
export function HeroImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="eager"
      fetchPriority="high"
      decoding="async"
      width={1920}
      height={1080}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
  );
}