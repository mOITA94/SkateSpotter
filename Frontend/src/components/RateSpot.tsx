import { useState } from 'react';
import { api } from '../services/api';

interface Props {
  spotId: number;
  onRated?: () => void;
}

export function RateSpot({ spotId, onRated }: Props) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [message, setMessage] = useState('');

  const handleRate = async () => {
    try {
      await api.post(`/ratings/${spotId}`, null, {
        params: { value: rating },
      });
      setMessage('Rating submitted successfully!');
      if (onRated) onRated();
    } catch (err) {
      console.error(err);
      setMessage('Error submitting rating.');
    }
  };

  return (
    <div className="my-6">
      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
        Rate this spot:
      </h3>

      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`text-3xl cursor-pointer transition ${
              value <= (hovered || rating)
                ? 'text-yellow-500'
                : 'text-gray-300 dark:text-gray-600'
            }`}
            onClick={() => setRating(value)}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(0)}
          >
            🛹
          </span>
        ))}
      </div>

      <button
        onClick={handleRate}
        className="bg-blue-600 text-white px-5 py-2 rounded-2xl shadow hover:bg-blue-700 transition disabled:opacity-50"
        disabled={rating === 0}
      >
        Submit Rating
      </button>

      {message && (
        <p className="text-sm mt-3 text-slate-700 dark:text-slate-300">{message}</p>
      )}
    </div>
  );
}
