import React from 'react';
import { FaSkating } from 'react-icons/fa';

interface SkateRatingProps {
  rating: number;
}

const SkateRating: React.FC<SkateRatingProps> = ({ rating }) => {
  const fullSkates = Math.floor(rating);
  const emptySkates = 5 - fullSkates;

  return (
    <div className="flex items-center">
      {[...Array(fullSkates)].map((_, i) => (
        <FaSkating key={`full-${i}`} className="text-yellow-500 text-lg" />
      ))}
      {[...Array(emptySkates)].map((_, i) => (
        <FaSkating key={`empty-${i}`} className="text-gray-300 dark:text-slate-600 text-lg" />
      ))}
    </div>
  );
};

export default SkateRating;
