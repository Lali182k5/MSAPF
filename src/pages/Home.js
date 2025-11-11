import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/feed', { replace: true });
  }, [user, navigate]);

  return (
    <Container maxWidth="md" sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <Stack spacing={3} alignItems="center" textAlign="center">
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Mini Social Post App
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Welcome to Mini Social Post App 🌍
        </Typography>
        <Typography color="text.secondary">
          Join the Mini Social community to post, like, and comment!
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button size="large" variant="contained" onClick={() => navigate('/signup')}>Sign Up</Button>
          <Button size="large" variant="outlined" onClick={() => navigate('/login')}>Log In</Button>
        </Stack>
      </Stack>
      <Box sx={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1,
        background: theme => theme.palette.mode === 'light'
          ? 'radial-gradient(50rem 20rem at 10% -10%, rgba(124,58,237,0.12), transparent 60%), radial-gradient(50rem 20rem at 110% 110%, rgba(6,182,212,0.12), transparent 60%)'
          : 'radial-gradient(50rem 20rem at 10% -10%, rgba(124,58,237,0.16), transparent 60%), radial-gradient(50rem 20rem at 110% 110%, rgba(6,182,212,0.16), transparent 60%)'
      }} />
    </Container>
  );
}
