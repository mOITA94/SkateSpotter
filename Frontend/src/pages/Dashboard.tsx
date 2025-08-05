import React, { useEffect, useState } from 'react';
import { spotService } from '../services/spotService';
import { SkateSpot } from '../types/types';
import { useNavigate } from 'react-router-dom';
import SkateRating from '../components/SkateRating';

export default function Dashboard() {
  const [spots, setSpots] = useState<SkateSpot[]>([]);
  const [loading, setLoading] = useState(true);

  const [difficulty, setDifficulty] = useState('');
  const [surface, setSurface] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const fetchSpots = async () => {
    setLoading(true);
    try {

      const mapDifficultyToPortuguese = (value: string) => {
        switch (value) {
          case 'Easy': return 'Fácil';
          case 'Medium': return 'Médio';
          case 'Hard': return 'Difícil';
        default: return '';
  }
};
      const data = await spotService.getAll({
        difficulty: difficulty || undefined,
        surface: surface || undefined,
        location: location || undefined,
      });
      setSpots(data);
    } catch (error) {
      console.error('Error fetching spots:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, []);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSpots();
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 min-h-screen text-slate-900 dark:text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Registered Skate Spots</h1>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-2xl shadow hover:bg-blue-700 transition"
          onClick={() => navigate('/new-spot')}
        >
          Add New Spot
        </button>
      </div>

      <form onSubmit={handleFilter} className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="City"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-slate-300 dark:border-slate-600 p-2 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border border-slate-300 dark:border-slate-600 p-2 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Difficulties</option>
          <option value="Fácil">Easy</option>
          <option value="Média">Medium</option>
          <option value="Difícil">Hard</option>
        </select>
        <select
          value={surface}
          onChange={(e) => setSurface(e.target.value)}
          className="border border-slate-300 dark:border-slate-600 p-2 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Surfaces</option>
          <option value="Asfalto">Asphalt</option>
          <option value="Concreto">Concrete</option>
          <option value="Madeira">Wood</option>
        </select>
        <button
          type="submit"
          className="bg-slate-800 dark:bg-slate-700 text-white rounded-2xl px-4 py-2 shadow hover:bg-slate-900 transition"
        >
          Filter
        </button>
      </form>

      {loading ? (
        <p className="text-slate-500 dark:text-slate-400">Loading...</p>
      ) : spots.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">No spots found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {spots.map((spot) => (
            <div
              key={spot.id}
              onClick={() => navigate(`/spots/${spot.id}`)}
              className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm bg-slate-50 dark:bg-slate-800 cursor-pointer hover:shadow-md transition"
            >
              <img
                src={spot.imageUrl}
                alt={spot.name}
                className="w-full h-48 object-cover mb-3 rounded-lg"
              />
              <h2 className="text-xl font-semibold">{spot.name}</h2>
              <p className="text-slate-500 dark:text-slate-400">Difficulty: {spot.difficulty}</p>
              <p className="text-slate-500 dark:text-slate-400">Surface: {spot.surface}</p>

              {spot.rating > 0 && (
                <div className="mt-2">
                  <SkateRating rating={Math.round(spot.rating)} />
                </div>
              )}

              <p className="text-blue-600 underline mt-2">View on Map</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
