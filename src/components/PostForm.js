import { useState } from 'react';
import { postApi } from '../services/api';
import { Box, TextField, Button, Card, CardContent, Stack, LinearProgress, Fade } from '@mui/material';

export default function PostForm({ onCreated }) {
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imageFile) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('text', text.trim());
      // Only append image if a file was actually chosen
      if (imageFile) formData.append('image', imageFile);
      await postApi.create(formData);
      setText('');
      setImageFile(null);
      setPreviewUrl(null);
      onCreated && onCreated();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 3, position: 'relative', overflow: 'hidden' }}>
      {loading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />}
      <CardContent>
        <Box component="form" onSubmit={submit}>
          <Stack spacing={2}>
            <TextField label="What's on your mind?" multiline minRows={2} value={text} onChange={(e) => setText(e.target.value)} />
            <Button variant="outlined" component="label" sx={{ fontWeight: 600 }}>
              {imageFile ? 'Change Image' : 'Upload Image'}
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  if (file) setPreviewUrl(URL.createObjectURL(file));
                }}
              />
            </Button>
            <Fade in={!!previewUrl} unmountOnExit>
              <Box sx={{
                border: '1px solid rgba(124,58,237,0.25)',
                p: 1,
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'center',
                background: 'linear-gradient(145deg,#ffffff,#f0eaff)'
              }}>
                {previewUrl && <img src={previewUrl} alt="preview" style={{ maxHeight: 280, width: 'auto', borderRadius: 12, boxShadow: '0 4px 14px rgba(124,58,237,0.25)' }} />}
              </Box>
            </Fade>
            <Button type="submit" variant="contained" disabled={loading || (!text && !imageFile)} sx={{ alignSelf: 'flex-start' }}>
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
