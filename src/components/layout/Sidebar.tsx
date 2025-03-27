'use client';

import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import BlockIcon from '@mui/icons-material/Block';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import BusinessIcon from '@mui/icons-material/Business';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';

const drawerWidth = 280;

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  { title: 'Мой кабинет', path: '/dashboard', icon: <HomeIcon /> },
  { title: 'Табели', path: '/timesheets', icon: <AssignmentIcon /> },
  { title: 'Мои соискатели', path: '/my-candidates', icon: <PersonIcon /> },
  { title: 'Мои звонки', path: '/my-calls', icon: <PhoneIcon />, badge: 1 },
  { title: 'Календарь', path: '/calendar', icon: <CalendarTodayIcon /> },
  { title: 'Все соискатели', path: '/all-candidates', icon: <GroupIcon /> },
  { title: 'Черный список', path: '/blacklist', icon: <BlockIcon /> },
  { title: 'Заявки', path: '/requests', icon: <DescriptionIcon /> },
  { title: 'План', path: '/plan', icon: <AssignmentIcon /> },
  { title: 'Каталог вакансий', path: '/vacancies', icon: <BusinessIcon /> },
  { title: 'Отклики', path: '/responses', icon: <DescriptionIcon />, badge: 499 },
  { title: 'Тикеты', path: '/tickets', icon: <DescriptionIcon />, badge: 2 },
  { title: 'Выплаты за рефералов', path: '/referral-payments', icon: <PaymentIcon /> },
  { title: 'Наши предприятия', path: '/our-companies', icon: <BusinessIcon /> },
  { title: 'Проживание', path: '/accommodation', icon: <BusinessIcon /> },
  { title: 'Статистика', path: '/statistics', icon: <AssessmentIcon /> },
  { title: 'Шаблоны рассылок', path: '/mailing-templates', icon: <DescriptionIcon /> },
  { title: 'Группы рекрутеров', path: '/recruiter-groups', icon: <GroupIcon /> },
  { title: 'Пользователи', path: '/users', icon: <GroupIcon /> },
  { title: 'Обращения', path: '/appeals', icon: <DescriptionIcon /> },
];

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNavItems = navItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          backgroundColor: '#fff',
        },
      }}
    >
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        height: 64
      }}>
        <Typography variant="h6" component="div" sx={{ 
          color: '#1a237e',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          Егоров Никита
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Сергеевич
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            }
          }}
        />
      </Box>

      <Typography
        variant="subtitle2"
        sx={{
          px: 2,
          py: 1,
          color: 'text.secondary',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          fontWeight: 700,
        }}
      >
        НАВИГАЦИЯ
      </Typography>

      <List
        sx={{
          pt: 0,
          '& .MuiListItemButton-root': {
            py: 1,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          },
          '& .MuiListItemIcon-root': {
            minWidth: 40,
            color: '#1a237e',
          },
        }}
      >
        {filteredNavItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                }}
              />
              {item.badge && (
                <Box
                  sx={{
                    backgroundColor: item.badge > 100 ? '#f44336' : '#1a237e',
                    color: '#fff',
                    borderRadius: '12px',
                    padding: '0 8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    minWidth: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.badge}
                </Box>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
} 