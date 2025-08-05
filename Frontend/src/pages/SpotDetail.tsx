import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { spotService } from '../services/spotService';
import { SkateSpot } from '../types/types';
import ReportModal from '../components/ReportModal';
import { RateSpot } from '../components/RateSpot';
import SkateRating from '../components/SkateRating';

export default function SpotDetail() {
  const { id } = useParams();
  const [spot, setSpot] = useState<SkateSpot | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    if (id) {
      spotService.getSpotById(Number(id)).then(setSpot);
    }
  }, [id]);

  if (!spot) {
    return (
      <div className="min-h-screen bg-slate-900 text-center flex items-center justify-center">
        <p className="text-slate-300 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-4xl bg-slate-800 text-slate-100 p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{spot.name}</h1>

        <img
          src={spot.imageUrl}
          alt={spot.name}
          className="w-full max-h-[60vh] object-cover rounded-xl mb-4"
        />

        <div className="space-y-2">
          <p><strong>Description:</strong> {spot.description}</p>
          <p>
            <strong>Location:</strong>{' '}
            <a
              href={spot.location}
              target="_blank"
              className="text-blue-400 underline hover:text-blue-300 transition"
              rel="noopener noreferrer"
            >
              View on Map
            </a>
          </p>
          <p><strong>Surface:</strong> {spot.surface}</p>
          <p><strong>Difficulty:</strong> {spot.difficulty}</p>
        </div>

        {spot.rating > 0 && (
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm text-slate-400">Average rating:</span>
            <SkateRating rating={spot.rating} />
            <span className="text-sm text-slate-400">
              ({spot.ratingCount} rating{spot.ratingCount > 1 ? 's' : ''})
            </span>
          </div>
        )}

        <div className="mt-6 w-full">
          <div className="max-w-md">
            <RateSpot spotId={spot.id} onRated={() => window.location.reload()} />
          </div>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="absolute bottom-4 right-4 text-sm px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition scale-90"
        >
          Report this spot
        </button>

        {showReportModal && (
          <ReportModal
            spotId={spot.id}
            onClose={() => setShowReportModal(false)}
          />
        )}
      </div>
    </div>
  );
}
