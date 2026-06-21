import React, { useState, useEffect } from "react";

interface CachedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
}

const CachedImage: React.FC<CachedImageProps> = ({ src, fallbackSrc, className, alt, ...props }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let objectUrl: string | null = null;
    let isMounted = true;

    const fetchImage = async () => {
      if (!src) {
        setIsLoading(false);
        return;
      }

      try {
        const cacheName = "adventurer-image-cache-v1";
        // The Cache API handles fetching and persisting perfectly
        const cache = await caches.open(cacheName);
        
        // Attempt to get from cache first
        const cachedResponse = await cache.match(src);

        if (cachedResponse) {
          const blob = await cachedResponse.blob();
          objectUrl = URL.createObjectURL(blob);
          if (isMounted) {
            setImageSrc(objectUrl);
            setIsLoading(false);
          }
        } else {
          // If not in cache, fetch it through standard networking
          const response = await fetch(src);
          if (response.ok) {
            // Once fetched successfully, put a clone in the cache mapping to this src
            await cache.put(src, response.clone());
            const blob = await response.blob();
            objectUrl = URL.createObjectURL(blob);
            if (isMounted) {
              setImageSrc(objectUrl);
              setIsLoading(false);
            }
          } else {
            throw new Error("Network response was not ok.");
          }
        }
      } catch (error) {
        console.warn("Error caching image (falling back to native src):", error);
        if (isMounted) {
          // If the cache lookup or fetch process fails, fallback to rendering natural src
          setImageSrc(src);
          setIsLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
      // Memory cleanup: free the browser blob URL when component unmounts
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  if (isLoading) {
    return (
      <div 
        className={`animate-pulse bg-gray-200 rounded ${className || ''}`} 
        style={{ width: props.width || '100%', height: props.height || '100%', minHeight: '100px' }} 
      />
    );
  }

  return (
    <img
      src={imageSrc || fallbackSrc || src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
          if (fallbackSrc) {
              (e.target as HTMLImageElement).src = fallbackSrc;
          }
      }}
      {...props}
    />
  );
};

export default CachedImage;
