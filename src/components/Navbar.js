import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Navbar({ themeMode = 'light', setThemeMode = () => {} }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };
  const toggle = () => setThemeMode(themeMode === 'light' ? 'dark' : 'light');

  return (
    <AppBar position="sticky" elevation={0}
      sx={{
        background:
          'linear-gradient(90deg, rgba(106,90,205,1) 0%, rgba(255,106,162,1) 100%)',
      }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800 }}>
          Mini Social Post App
        </Typography>
        <Stack direction="row" spacing={1.5}>
          <Button color="inherit" startIcon={<HomeRoundedIcon />} component={Link} to="/feed" sx={{
            '&:hover': { transform: 'translateY(-1px)' }, transition: 'transform 120ms ease'
          }}>Feed</Button>
          {user && <Button color="inherit" startIcon={<AddAPhotoRoundedIcon />} component={Link} to="/create" sx={{
            '&:hover': { transform: 'translateY(-1px)' }, transition: 'transform 120ms ease'
          }}>Create</Button>}
          {!user && <Button color="inherit" startIcon={<PersonAddAlt1RoundedIcon />} component={Link} to="/signup" sx={{
            '&:hover': { transform: 'translateY(-1px)' }, transition: 'transform 120ms ease'
          }}>Signup</Button>}
          {!user && <Button color="inherit" startIcon={<LoginRoundedIcon />} component={Link} to="/login" sx={{
            '&:hover': { transform: 'translateY(-1px)' }, transition: 'transform 120ms ease'
          }}>Login</Button>}
          {user && <Button color="inherit" startIcon={<LogoutRoundedIcon />} onClick={handleLogout} sx={{
            '&:hover': { transform: 'translateY(-1px)' }, transition: 'transform 120ms ease'
          }}>Logout</Button>}
        </Stack>
        <Tooltip title={themeMode === 'light' ? 'Dark mode' : 'Light mode'}>
          <IconButton color="inherit" onClick={toggle} sx={{ ml: 2 }}>
            {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
