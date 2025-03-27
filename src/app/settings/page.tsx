'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = React.useState({
    notifications: true,
    darkMode: false,
    language: 'ru',
  });

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleLanguageChange = (event: any) => {
    setSettings(prev => ({
      ...prev,
      language: event.target.value,
    }));
  };

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
            Настройки
          </Typography>
          <Paper sx={{ mt: 3 }}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Уведомления"
                  secondary="Получать уведомления о новых кандидатах"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.notifications}
                    onChange={() => handleToggle('notifications')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Темная тема"
                  secondary="Использовать темную тему оформления"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.darkMode}
                    onChange={() => handleToggle('darkMode')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Язык"
                  secondary="Выберите язык интерфейса"
                />
                <ListItemSecondaryAction>
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <Select
                      value={settings.language}
                      onChange={handleLanguageChange}
                    >
                      <MenuItem value="ru">Русский</MenuItem>
                      <MenuItem value="en">English</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
} 