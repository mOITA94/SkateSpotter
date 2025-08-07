import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800 text-white flex justify-between items-center px-6 py-4 shadow-md">
      <h1
        className="text-2xl font-bold tracking-wide cursor-pointer"
        onClick={() => navigate('/')}
      >
        SkateSpotter 🛹
      </h1>

      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 px-4 py-1 rounded-md text-sm hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="border border-white px-4 py-1 rounded-md text-sm hover:bg-white hover:text-slate-800 transition"
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-1 rounded-md text-sm hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
