import { Button } from '@mui/material';

export default function GradientButton(props) {
  return (
    <Button
      variant="contained"
      disableElevation
      sx={{
        background:
          'linear-gradient(135deg, #6a5acd 0%, #8f7fff 50%, #ff6aa2 100%)',
        color: '#fff',
        boxShadow: '0 8px 24px rgba(143,127,255,0.35)',
        '&:hover': {
          filter: 'brightness(1.05)',
          boxShadow: '0 10px 28px rgba(143,127,255,0.45)',
        },
      }}
      {...props}
    />
  );
}