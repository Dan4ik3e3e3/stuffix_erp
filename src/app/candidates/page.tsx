'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CandidateList from '@/components/CandidateList';
import Layout from '@/components/Layout';
import { ICandidate } from '@/models/Candidate';

export default function CandidatesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCandidates();
    }
  }, [status]);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('/api/candidates');
      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }
      const data = await response.json();
      setCandidates(data);
    } catch (err) {
      setError('Ошибка при загрузке кандидатов');
      console.error('Error fetching candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (candidate: ICandidate) => {
    try {
      const response = await fetch('/api/candidates', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidate),
      });

      if (!response.ok) {
        throw new Error('Failed to update candidate');
      }

      const updatedCandidate = await response.json();
      setCandidates(prev =>
        prev.map(c => c._id === updatedCandidate._id ? updatedCandidate : c)
      );
    } catch (err) {
      console.error('Error updating candidate:', err);
      setError('Ошибка при обновлении кандидата');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/candidates?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete candidate');
      }

      setCandidates(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error('Error deleting candidate:', err);
      setError('Ошибка при удалении кандидата');
    }
  };

  const handleAdd = async (candidate: Partial<ICandidate>) => {
    try {
      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidate),
      });

      if (!response.ok) {
        throw new Error('Failed to add candidate');
      }

      const newCandidate = await response.json();
      setCandidates(prev => [...prev, newCandidate]);
    } catch (err) {
      console.error('Error adding candidate:', err);
      setError('Ошибка при добавлении кандидата');
    }
  };

  if (status === 'loading' || loading) {
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

  if (error) {
    return (
      <Layout>
        <Container>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography color="error">{error}</Typography>
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
            Кандидаты
          </Typography>
          <CandidateList
            candidates={candidates}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
        </Box>
      </Container>
    </Layout>
  );
} 