'use client';

import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export default function CalendarPage() {
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProfession, setSelectedProfession] = useState('all');
  const [dateRange, setDateRange] = useState(['2025-03-21', '2025-03-27']);

  const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  const currentWeek = dateRange[0].split('-')[2] + ' - ' + dateRange[1].split('-')[2] + ' марта 2025';

  return (
    <Container maxWidth={false} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Общий календарь
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography>Календарь</Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            displayEmpty
          >
            <MenuItem value="all">Все пользователи</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" size="small">
          ПРИМЕНИТЬ
        </Button>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6">{currentWeek}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant="outlined">&lt;</Button>
          <Button size="small" variant="outlined">&gt;</Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              {days.map((day, index) => (
                <TableCell 
                  key={day}
                  align="center"
                  sx={{
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                    backgroundColor: index === 1 ? 'rgba(232, 245, 233, 0.5)' : 'inherit',
                    minWidth: 150
                  }}
                >
                  {day} {parseInt(dateRange[0].split('-')[2]) + index}.3
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {days.map((_, index) => (
                <TableCell 
                  key={index}
                  sx={{
                    height: 100,
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                    backgroundColor: index === 1 ? 'rgba(232, 245, 233, 0.5)' : 'inherit'
                  }}
                />
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Календарь
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              displayEmpty
            >
              <MenuItem value="all">Все пользователи</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              displayEmpty
            >
              <MenuItem value="all">Все</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              displayEmpty
            >
              <MenuItem value="all">Все</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" size="small">
            ПОИСК
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Настройки
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: '200px' }}>
            <Typography variant="subtitle2" gutterBottom>
              Время начала
            </Typography>
            <TextField
              type="time"
              size="small"
              fullWidth
              defaultValue="09:00"
            />
          </Box>
          <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: '200px' }}>
            <Typography variant="subtitle2" gutterBottom>
              Время окончания
            </Typography>
            <TextField
              type="time"
              size="small"
              fullWidth
              defaultValue="18:00"
            />
          </Box>
          <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: '200px' }}>
            <Typography variant="subtitle2" gutterBottom>
              Кол-во записей на слот
            </Typography>
            <TextField
              type="number"
              size="small"
              fullWidth
              defaultValue="1"
            />
          </Box>
          <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: '200px' }}>
            <Typography variant="subtitle2" gutterBottom>
              Размер слота (мин)
            </Typography>
            <TextField
              type="number"
              size="small"
              fullWidth
              defaultValue="30"
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        {days.map((day) => (
          <FormControl key={day}>
            <Typography variant="subtitle2" gutterBottom>
              {day.toUpperCase()}
            </Typography>
            <input type="checkbox" />
          </FormControl>
        ))}
      </Box>
    </Container>
  );
} 