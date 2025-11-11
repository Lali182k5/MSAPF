import { Container, Typography } from '@mui/material';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import PostForm from '../components/PostForm';

export default function CreatePost() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb:2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
        <AddAPhotoRoundedIcon /> Create Post
      </Typography>
      <PostForm />
    </Container>
  );
}
