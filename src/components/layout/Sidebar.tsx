'use client';

import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  InputAdornment,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  PhoneInTalk as PhoneInTalkIcon,
  BarChart as BarChartIcon,
  EventNote as EventNoteIcon,
  Group as GroupIcon,
  Home as HomeIcon,
  Block as BlockIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

const drawerWidth = 280;

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { title: 'Мой кабинет', path: '/dashboard', icon: <DashboardIcon /> },
  { title: 'Мои соискатели', path: '/my-candidates', icon: <PersonIcon /> },
  { title: 'Мои звонки', path: '/my-calls', icon: <PhoneIcon /> },
  { title: 'Заявки', path: '/requests', icon: <AssignmentIcon /> },
  { title: 'Все соискатели', path: '/all-candidates', icon: <PeopleIcon /> },
  {
    title: 'Статистика',
    path: '/statistics',
    icon: <AssessmentIcon />,
    children: [
      { title: 'Детализация звонков', path: '/statistics/calls', icon: <PhoneInTalkIcon /> },
      { title: 'Статистика по рекрутерам', path: '/statistics/recruiters', icon: <BarChartIcon /> },
    ],
  },
  { title: 'Табели', path: '/timesheets', icon: <EventNoteIcon /> },
  { title: 'Пользователи', path: '/users', icon: <GroupIcon /> },
  { title: 'Проживание', path: '/accommodation', icon: <HomeIcon /> },
  { title: 'Черный список', path: '/blacklist', icon: <BlockIcon /> },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [openStatistics, setOpenStatistics] = useState(false);

  const filteredNavItems = navItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  const handleStatisticsClick = () => {
    setOpenStatistics(!openStatistics);
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
          borderRight: '1px solid rgba(163, 174, 208, 0.2)',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            mb: 3,
            textAlign: 'center',
          }}
        >
          RecruiterPRO
        </Typography>

        <TextField
          fullWidth
          size="small"
          placeholder="Поиск в меню..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <List sx={{ width: '100%' }}>
          {filteredNavItems.map((item) => (
            item.children ? (
              <Box key={item.path}>
                <ListItemButton onClick={handleStatisticsClick}>
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: pathname.startsWith(item.path) ? 600 : 400,
                    }}
                  />
                  {openStatistics ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openStatistics} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.path}
                        onClick={() => handleNavClick(child.path)}
                        selected={pathname === child.path}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon sx={{ color: 'primary.main' }}>
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={child.title}
                          primaryTypographyProps={{
                            fontWeight: pathname === child.path ? 600 : 400,
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ) : (
              <ListItemButton
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                selected={pathname === item.path}
              >
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: pathname === item.path ? 600 : 400,
                  }}
                />
              </ListItemButton>
            )
          ))}
        </List>
      </Box>
    </Drawer>
  );
} 