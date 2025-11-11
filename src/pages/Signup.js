import { useState } from 'react';
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Stack, Alert, Paper } from '@mui/material';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { useNavigate } from 'react-router-dom';
import GradientButton from '../components/GradientButton';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
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
      const res = await authApi.signup(form);
      login(res.data.user, res.data.token);
      navigate('/feed');
    } catch (err) {
      if (err.response) {
        const backendMsg = err.response.data?.message;
        const validation = err.response.data?.errors;
        if (validation?.length) {
          setError(validation.map(v => v.msg).join(', '));
        } else if (backendMsg) {
          setError(backendMsg);
        } else {
          setError('Signup failed (server error)');
        }
      } else if (err.request) {
        setError('Cannot reach backend. Check API URL or server status.');
      } else {
        setError('Unexpected error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonAddAlt1RoundedIcon /> Signup
        </Typography>
        {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}
        <Stack component="form" spacing={2} onSubmit={submit}>
          <TextField label="Username" name="username" value={form.username} onChange={handleChange} required />
          <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
          <GradientButton fullWidth type="submit" size="large" disabled={loading}>{loading ? 'Submitting...' : 'Sign up'}</GradientButton>
          <Typography variant="caption" color="text.secondary">API: {process.env.REACT_APP_API_URL}</Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
