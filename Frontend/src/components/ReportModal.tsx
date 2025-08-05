import { useState } from 'react';
import { reportService } from '../services/reportService';

interface Props {
  spotId: number;
  onClose: () => void;
}

export default function ReportModal({ spotId, onClose }: Props) {
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await reportService.createReport({ spotId, reason });
      setMessage('Report submitted successfully!');
      setTimeout(onClose, 1500);
    } catch (err) {
      setMessage('Error submitting report.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Report Spot</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            placeholder="Describe the reason for the report"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            rows={4}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-slate-800 dark:text-white rounded-2xl hover:bg-gray-400 dark:hover:bg-slate-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition"
            >
              Submit
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">{message}</p>
        )}
      </div>
    </div>
  );
}
