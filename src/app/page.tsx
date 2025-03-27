'use client';

import { useRouter } from 'next/navigation';
import { Container, Paper, Button, Typography } from '@mui/material';

export default function LoginPage() {
  const router = useRouter();

  return (
    <Container component="main" maxWidth="xs" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
    }}>
      <Paper elevation={6} sx={{ 
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        borderRadius: 2
      }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3, color: '#1a237e' }}>
          Stuffix ERP
        </Typography>

        <Button
          onClick={() => router.push('/dashboard')}
          fullWidth
          variant="contained"
          sx={{ 
            mt: 3, 
            mb: 2,
            height: 48,
            background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #0d47a1 30%, #1a237e 90%)',
            }
          }}
        >
          Войти в систему
        </Button>
      </Paper>
    </Container>
  );
} 