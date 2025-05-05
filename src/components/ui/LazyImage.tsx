import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  placeholderSrc?: string;
  threshold?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholderSrc = '/placeholder.jpg',
  threshold = 100,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholderSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      // Fallback to placeholder if image fails to load
      setImageSrc(placeholderSrc);
      setIsLoading(false);
    };
  }, [src, placeholderSrc]);

  return (
    <LazyLoadImage
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoading ? 'loading' : ''}`}
      effect="blur"
      threshold={threshold}
      placeholderSrc={placeholderSrc}
      useIntersectionObserver
    />
  );
};

export default LazyImage; 