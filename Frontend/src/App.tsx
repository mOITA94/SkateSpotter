import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import NewSpotForm from './pages/NewSpotForm'; 
import VerifyLink from './pages/VerifyLink';
import SpotDetail from './pages/SpotDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rota protegida */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/new-spot"
        element={
          <PrivateRoute>
            <>
              <NewSpotForm />
            </>
          </PrivateRoute>
        }
      />
      <Route path="/verify" element={<VerifyLink />} />
      <Route path="/spots/:id" element={<SpotDetail />} />

      {/* Redireciona qualquer outra rota para /login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}



