'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)', lg: '1 1 calc(25% - 18px)' } }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Активные проекты
            </Typography>
            <Typography component="p" variant="h4">
              24
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              +15% с прошлого месяца
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)', lg: '1 1 calc(25% - 18px)' } }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Сотрудники
            </Typography>
            <Typography component="p" variant="h4">
              156
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              +3 за последнюю неделю
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)', lg: '1 1 calc(25% - 18px)' } }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Задачи на сегодня
            </Typography>
            <Typography component="p" variant="h4">
              12
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              5 выполнено
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)', lg: '1 1 calc(25% - 18px)' } }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Выполнение в срок
            </Typography>
            <Typography component="p" variant="h4">
              98%
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              За последний месяц
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
} 