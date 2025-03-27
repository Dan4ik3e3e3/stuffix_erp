import React from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';

export default function Register() {
  const router = useRouter();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      console.log('Sending registration request...');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Registration successful');
        router.push('/auth/signin');
      } else {
        console.error('Registration failed:', result);
        setError(result.error || 'Ошибка при регистрации');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Регистрация администратора
          </Typography>
          <Typography color="textSecondary" align="center" paragraph>
            Первый зарегистрированный пользователь становится администратором системы
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Имя"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="new-password"
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
} 