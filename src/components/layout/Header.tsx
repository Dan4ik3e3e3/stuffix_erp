'use client';

import { useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationsAnchor(null);
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {format(new Date(), 'd MMMM yyyy, EEEE', { locale: ru })}
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <TextField
            size="small"
            placeholder="Поиск по системе..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
                '&.Mui-focused': {
                  backgroundColor: '#fff',
                }
              }
            }}
          />
        </Box>

        <IconButton
          size="small"
          onClick={handleNotificationsClick}
          sx={{ 
            width: 40, 
            height: 40,
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          <Badge badgeContent={3} color="error">
            <NotificationsIcon sx={{ fontSize: 20 }} />
          </Badge>
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 0.5,
            px: 1,
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
            }
          }}
          onClick={handleProfileClick}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: 'primary.main',
              fontSize: '0.875rem',
            }}
          >
            ЕН
          </Avatar>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>
              Егоров Никита
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Администратор
            </Typography>
          </Box>
          <KeyboardArrowDownIcon 
            sx={{ 
              fontSize: 20, 
              color: 'text.secondary',
              display: { xs: 'none', sm: 'block' }
            }} 
          />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            }
          }}
        >
          <MenuItem onClick={handleClose}>Мой профиль</MenuItem>
          <MenuItem onClick={handleClose}>Настройки</MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
            Выйти
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={notificationsAnchor}
          open={Boolean(notificationsAnchor)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 320,
              maxHeight: 400,
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Уведомления
            </Typography>
            <Typography variant="body2" color="text.secondary">
              У вас 3 новых уведомления
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleClose}>
            <Box sx={{ py: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Новая заявка на рассмотрение
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 минуты назад
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Box sx={{ py: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Обновление статуса кандидата
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 час назад
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Box sx={{ py: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Новое сообщение в тикете #1234
              </Typography>
              <Typography variant="caption" color="text.secondary">
                3 часа назад
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
} 