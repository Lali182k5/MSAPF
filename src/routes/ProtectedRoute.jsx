import { Navigate, Outlet, useLocation } from 'react-router-dom';

function isAuthed() {
  return !!localStorage.getItem('token');
}

export default function ProtectedRoute() {
  const location = useLocation();
  return isAuthed() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}