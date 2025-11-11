import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Feed from './pages/Feed';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App({ themeMode, setThemeMode }) {
  const [snack, setSnack] = useState(null); // { severity, message }
  const notify = (message, severity = 'success') => setSnack({ message, severity });

  return (
    <AuthProvider>
      <BrowserRouter>
  <Navbar themeMode={themeMode} setThemeMode={setThemeMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<PrivateRoute><Feed /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        </Routes>
        <Snackbar
          open={!!snack}
          autoHideDuration={2500}
          onClose={() => setSnack(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={() => setSnack(null)} severity={snack?.severity} variant="filled">
            {snack?.message}
          </Alert>
        </Snackbar>
      </BrowserRouter>
    </AuthProvider>
  );
}
