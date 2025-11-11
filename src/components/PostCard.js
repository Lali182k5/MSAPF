import { Card, CardHeader, CardContent, Typography, CardActions, IconButton, Avatar, TextField, Button, Stack, Chip, Box, Dialog, DialogContent, Skeleton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState } from 'react';
import { postApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function PostCard({ post = {}, onLike, onComment }) {
  const { user } = useAuth() || {};
  const [commentText, setCommentText] = useState('');
  const [commenting, setCommenting] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const likeCount = post.likes?.length || 0;
  const likedByUser = Boolean(user && post.likes?.includes(user.id || user._id));

  const rawImage = post.image;
  const hasImage = rawImage && typeof rawImage === 'string' && rawImage.trim() !== '' && !rawImage.includes('placeholder');
  const imgSrc = hasImage ? (rawImage.startsWith('http') ? rawImage : `${process.env.REACT_APP_API_URL || ''}${rawImage}`) : null;

  const handleLike = async () => {
    if (!post._id) return;
    try {
      await postApi.like(post._id);
      setLikeAnimating(true);
      onLike && onLike(post._id);
      setTimeout(() => setLikeAnimating(false), 500);
    } catch (err) { console.error(err); }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !post._id) return;
    setCommenting(true);
    try {
      await postApi.comment(post._id, commentText);
      setCommentText('');
      onComment && onComment(post._id);
    } catch (err) { console.error(err); } finally { setCommenting(false); }
  };

  return (
    <Card sx={{ mb: 2, overflow: 'visible' }}>
      <CardHeader
        avatar={<Avatar>{post.username?.[0]?.toUpperCase() || 'U'}</Avatar>}
        title={post.username || 'Unknown'}
        subheader={new Date(post.createdAt || Date.now()).toLocaleString()}
      />

      <CardContent>
        {post.text && <Typography variant="body1" sx={{ mb: 1 }}>{post.text}</Typography>}

        {hasImage && (
          <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', mb: 1 }}>
            {!loaded && (
              <Skeleton variant="rectangular" height={380} animation="wave" />
            )}
            <Box
              component="img"
              src={imgSrc}
              alt={post.text || 'post'}
              onLoad={() => setLoaded(true)}
              sx={{
                width: '100%',
                maxHeight: 520,
                display: loaded ? 'block' : 'none',
                objectFit: 'contain',
                transition: 'transform 250ms ease, filter 300ms ease',
                '&:hover': { transform: 'scale(1.01)' },
              }}
            />
          </Box>
        )}

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip label={`${likeCount} like${likeCount===1?'':'s'}`} size="small" />
          <Chip label={`${post.comments?.length || 0} comment${(post.comments?.length||0)===1?'':'s'}`} size="small" />
        </Stack>

        {Array.isArray(post.comments) && post.comments.length > 0 && (
          <Stack spacing={0.5} sx={{ mt: 1 }}>
            {post.comments.slice(-5).map((c, idx) => (
              <Typography key={c?._id || idx} variant="caption"><strong>{c?.username || 'User'}</strong>: {c?.text || ''}</Typography>
            ))}
          </Stack>
        )}
      </CardContent>

      <CardActions>
        <IconButton disabled={!user} onClick={handleLike} color={likedByUser ? 'secondary' : 'primary'} sx={{
          position: 'relative',
          '& svg': {
            transition: 'transform 300ms ease',
            transform: likeAnimating ? 'scale(1.4)' : 'scale(1)'
          }
        }}>
          {likedByUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton disabled={!user} onClick={() => { setOpenImage(true); }} color="primary">
          <ChatBubbleOutlineIcon />
        </IconButton>
      </CardActions>

      {user && (
        <CardContent>
          <Stack component="form" direction="row" spacing={1} onSubmit={submitComment}>
            <TextField size="small" placeholder="Add comment" value={commentText} onChange={e => setCommentText(e.target.value)} fullWidth />
            <Button type="submit" variant="contained" disabled={commenting}>Comment</Button>
          </Stack>
        </CardContent>
      )}

      <Dialog open={openImage} onClose={() => setOpenImage(false)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0, background: 'black' }}>
          {imgSrc && <img src={imgSrc} alt="full" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
