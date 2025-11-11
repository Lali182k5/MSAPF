import { useEffect, useState } from 'react';
import { postApi } from '../services/api';
import { Container, Typography, Skeleton, Stack, Fab, Zoom, Tooltip } from '@mui/material';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { useAuth } from '../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = await postApi.list();
      setPosts(res.data.items || res.data); // supports both paginated or array
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleCreated = (newPost) => setPosts(prev => [newPost, ...prev]);

  const handleLike = (id) => {
    setPosts(prev => prev.map(p => p._id === id ? { ...p, likes: p.likes?.length ? p.likes.slice(0, p.likes.length) : p.likes } : p));
    load(); // refresh for accurate counts
  };

  const handleComment = () => load();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {user && <PostForm onCreated={handleCreated} />}
      <Typography variant="h5" sx={{ mb:2 }}>Feed</Typography>
      {loading && (
        <Stack spacing={2} sx={{ mb: 2 }}>
          {[1,2].map(i => (
            <Stack key={i} spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Skeleton variant="circular" width={40} height={40} />
                <Stack spacing={0.5}>
                  <Skeleton variant="text" width={120} />
                  <Skeleton variant="text" width={80} />
                </Stack>
              </Stack>
              <Skeleton variant="text" height={24} />
              <Skeleton variant="rounded" height={220} />
            </Stack>
          ))}
        </Stack>
      )}
      {(Array.isArray(posts) ? posts : []).filter(Boolean).map(p => (
        <PostCard key={p?._id || `${p?.username || 'post'}-${Math.random()}`} post={p} onLike={handleLike} onComment={handleComment} />
      ))}
      {!loading && posts.length === 0 && <Typography>No posts yet.</Typography>}
      <Zoom in>
        <Tooltip title="Create Post">
          <Fab color="primary"
              onClick={() => navigate('/create')}
              sx={{
                position: 'fixed', right: 24, bottom: 24,
                background:
                  'linear-gradient(135deg, #6a5acd 0%, #ff6aa2 100%)',
              }}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Zoom>
    </Container>
  );
}
