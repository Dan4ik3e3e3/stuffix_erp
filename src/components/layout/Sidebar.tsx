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
  Collapse,
  Typography,
} from '@mui/material';
import {
  Person,
  Group,
  Phone,
  Assignment,
  Assessment,
  AccessTime,
  People,
  Home,
  Business,
  Block,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import Link from 'next/link';

const drawerWidth = 280;

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { title: 'Мой кабинет', path: '/my-cabinet', icon: <Home /> },
  { title: 'Мои соискатели', path: '/my-candidates', icon: <Person /> },
  { title: 'Мои звонки', path: '/my-calls', icon: <Phone /> },
  { title: 'Заявки', path: '/requests', icon: <Assignment /> },
  { title: 'Все соискатели', path: '/all-candidates', icon: <Group /> },
  {
    title: 'Статистика',
    path: '/statistics',
    icon: <Assessment />,
    children: [
      { title: 'Общая статистика', path: '/statistics/general', icon: <Assessment /> },
      { title: 'По рекрутерам', path: '/statistics/recruiters', icon: <People /> },
    ]
  },
  { title: 'Детализация звонков', path: '/call-details', icon: <AccessTime /> },
  { title: 'Табели', path: '/timesheets', icon: <Assignment /> },
  { title: 'Пользователи', path: '/users', icon: <People /> },
  { title: 'Проживание', path: '/accommodation', icon: <Business /> },
  { title: 'Черный список', path: '/blacklist', icon: <Block /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState<string | null>(null);

  const handleClick = (path: string) => {
    setOpen(open === path ? null : path);
  };

  const renderNavItem = (item: NavItem) => {
    if (item.children) {
      return (
        <Box key={item.path}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick(item.path)}>
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: open === item.path ? 600 : 400
                }}
              />
              {open === item.path ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={open === item.path} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItem key={child.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={child.path}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {child.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={child.title}
                      primaryTypographyProps={{
                        fontSize: '0.9rem'
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      );
    }

    return (
      <ListItem key={item.path} disablePadding>
        <ListItemButton
          component={Link}
          href={item.path}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText 
            primary={item.title}
            primaryTypographyProps={{
              fontSize: '0.95rem'
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

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
        height: 64
      }}>
        <Typography variant="h6" component="div" sx={{ 
          color: '#1a237e',
          fontWeight: 600,
          fontSize: '1.2rem'
        }}>
          Stuffix ERP
        </Typography>
      </Box>
      <List
        sx={{
          pt: 2,
          '& .MuiListItemButton-root': {
            py: 1.5,
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
        {navItems.map(renderNavItem)}
      </List>
    </Drawer>
  );
} 