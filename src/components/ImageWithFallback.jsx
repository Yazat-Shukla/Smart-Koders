import React, { useState } from 'react';
import { Compass } from 'lucide-react';

export default function ImageWithFallback({
  src,
  alt,
  title,
  className = 'w-full h-full object-cover'
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt || title || 'Destination photograph'}
        className="w-full h-full bg-gradient-to-br from-[#102A43] via-[#1B3B5A] to-[#0F766E] flex flex-col items-center justify-center p-4 text-center text-white select-none"
      >
        <Compass className="w-8 h-8 text-[#CCFBF1] mb-2 opacity-90" />
        <span className="text-sm font-semibold tracking-tight text-white/95 line-clamp-1">
          {title || alt || 'TripPilot Destination'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || title || 'Travel destination'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
