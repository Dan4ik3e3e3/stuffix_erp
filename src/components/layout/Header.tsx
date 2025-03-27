'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
    handleClose();
  };

  const currentTime = new Date().toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const currentDate = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(163, 174, 208, 0.2)',
      }}
    >
      <Toolbar>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mr: 4, display: { xs: 'none', md: 'block' } }}
        >
          {currentDate} | {currentTime}
        </Typography>

        <TextField
          placeholder="Поиск по системе (ID, Ф.И.О., номер телефона, отклика, тикета)"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            flexGrow: 1,
            maxWidth: 600,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.default',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            color="default"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleProfileClick}
            size="small"
            sx={{ ml: 2 }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'primary.main',
              }}
            >
              {session?.user?.name?.[0] || 'U'}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleLogout}>Выйти</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 