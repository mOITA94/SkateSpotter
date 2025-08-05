import React, { useState } from 'react';
import { spotService } from '../services/spotService';

export default function NewSpotForm() {
  const username = localStorage.getItem('username');
  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    surface: '',
    difficulty: '',
    image: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) return setMessage('Please select an image.');

    try {
      setLoading(true);
      await spotService.createSpot({
        username: username || '',
        ...form,
        image: form.image,
      });
      setMessage('Spot registered successfully!');
      setForm({
        name: '',
        description: '',
        location: '',
        surface: '',
        difficulty: '',
        image: null,
      });
    } catch (err) {
      console.error(err);
      setMessage('Error registering the spot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-slate-800 text-slate-100 p-6 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-2">Register New Skate Spot</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Spot name"
          className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="City / Location"
          className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="surface"
          value={form.surface}
          onChange={handleChange}
          className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select surface type</option>
          <option value="Asphalt">Asphalt</option>
          <option value="Concrete">Concrete</option>
          <option value="Wood">Wood</option>
        </select>

        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-2xl shadow hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Submit'}
        </button>

        {message && (
          <p className="text-sm text-slate-300 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
