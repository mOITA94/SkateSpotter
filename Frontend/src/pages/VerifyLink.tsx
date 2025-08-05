import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VerifyLink() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const email = searchParams.get('email');
    const code = searchParams.get('code');

    if (email && code) {
      axios
        .get('http://localhost:5173/api/verify-email', {
          params: { email, code },
        })
        .then(() => {
          alert('Account successfully verified!');
          navigate('/login');
        })
        .catch(() => {
          alert('Invalid or expired verification code.');
          navigate('/login');
        });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <p className="text-slate-600 dark:text-slate-300 text-lg">
        Verifying your account...
      </p>
    </div>
  );
}
