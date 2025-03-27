'use client';

import React from 'react';
import { Box, Container, Typography, Paper, Grid, TextField, Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <Layout>
        <Container>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography>Загрузка...</Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Профиль
          </Typography>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Имя"
                value={session?.user?.name || ''}
                disabled
              />
              <TextField
                fullWidth
                label="Email"
                value={session?.user?.email || ''}
                disabled
              />
              <TextField
                fullWidth
                label="Роль"
                value={session?.user?.role || ''}
                disabled
              />
              <Button variant="contained" color="primary">
                Изменить пароль
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
} 