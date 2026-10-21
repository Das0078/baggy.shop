import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  showScore?: boolean;
  size?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  showScore = true,
  size = 15,
  className = '',
}) => {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      stars.push(
        <FaStar key={i} size={size} className="text-theme-star" />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt key={i} size={size} className="text-theme-star" />
      );
    } else {
      stars.push(
        <FaRegStar key={i} size={size} className="text-theme-star/40" />
      );
    }
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">{stars}</div>
      {showScore && (
        <span className="text-xs md:text-sm text-theme-text-muted font-normal ml-1">
          {rating.toFixed(1)}/<span className="text-theme-text-muted/70">{maxStars}</span>
        </span>
      )}
    </div>
  );
};
