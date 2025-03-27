'use client';

import { Container, Typography, Paper, Grid } from '@mui/material';

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Панель управления
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2">
              Добро пожаловать в Stuffix ERP
            </Typography>
            <Typography>
              Здесь будет располагаться основной контент панели управления.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
} 