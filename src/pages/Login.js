import { useState } from 'react';
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Stack, Alert, Paper } from '@mui/material';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await authApi.login(form);
      login(res.data.user, res.data.token);
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
          <LockOpenRoundedIcon /> Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}
        <Stack component="form" spacing={2} onSubmit={submit}>
          <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
          <Button type="submit" variant="contained" disabled={loading} sx={{ alignSelf: 'flex-start' }}>{loading ? 'Logging in...' : 'Login'}</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
