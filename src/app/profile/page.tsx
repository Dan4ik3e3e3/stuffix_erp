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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Имя"
                  value={session?.user?.name || ''}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={session?.user?.email || ''}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Роль"
                  value={session?.user?.role || ''}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Изменить пароль
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
} 