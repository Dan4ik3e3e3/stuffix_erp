'use client';

import { Box } from '@mui/material';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F7F9FC' }}>
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          zIndex: 1200,
          width: '280px',
          height: '100vh',
        }}
      >
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: '280px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            backgroundColor: 'background.paper',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          }}
        >
          <Header />
        </Box>
        <Box
          component="div"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: '#F7F9FC',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
} 