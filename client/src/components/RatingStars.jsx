import React from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '@contexts/ThemeContext';

const RatingStars = ({ rating, totalRatings, onRate, userRating, size = 'md', readonly = false }) => {
  const { isDarkMode } = useTheme();
  const stars = [1, 2, 3, 4, 5];

  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const getStarColor = (starValue) => {
    if (readonly) {
      return starValue <= rating ? 'text-yellow-400' : isDarkMode ? 'text-gray-600' : 'text-gray-300';
    }
    return (userRating && starValue <= userRating) || (!userRating && starValue <= rating)
      ? 'text-yellow-400'
      : isDarkMode ? 'text-gray-600' : 'text-gray-300';
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1">
        {stars.map((star) => (
          <motion.button
            key={star}
            whileHover={!readonly ? { scale: 1.1 } : {}}
            whileTap={!readonly ? { scale: 0.9 } : {}}
            onClick={() => !readonly && onRate && onRate(star)}
            className={`transition-colors duration-200 ${
              !readonly ? 'cursor-pointer hover:text-yellow-400' : 'cursor-default'
            }`}
            disabled={readonly}
          >
            <FaStar className={`${starSizes[size]} ${getStarColor(star)}`} />
          </motion.button>
        ))}
        {rating > 0 && (
          <span className={`ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            ({rating.toFixed(1)})
          </span>
        )}
      </div>
      {totalRatings > 0 && (
        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
        </span>
      )}
    </div>
  );
};

export default RatingStars; 