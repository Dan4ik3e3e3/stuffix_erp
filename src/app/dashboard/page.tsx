'use client';

import { Container, Typography, Paper, Box } from '@mui/material';

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Панель управления
      </Typography>
      
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" component="h2">
            Добро пожаловать в Stuffix ERP
          </Typography>
          <Typography>
            Здесь будет располагаться основной контент панели управления.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
} 