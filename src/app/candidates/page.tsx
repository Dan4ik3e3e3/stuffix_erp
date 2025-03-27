'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CandidateList from '@/components/CandidateList';
import CandidateForm from '@/components/CandidateForm';
import Layout from '@/components/Layout';
import { ICandidate } from '@/models/Candidate';

export default function CandidatesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<ICandidate | null>(null);

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
    setEditingCandidate(candidate);
    setFormOpen(true);
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

  const handleAdd = () => {
    setEditingCandidate(null);
    setFormOpen(true);
  };

  const handleSubmit = async (data: Partial<ICandidate>) => {
    try {
      const url = editingCandidate
        ? `/api/candidates?id=${editingCandidate._id}`
        : '/api/candidates';

      const response = await fetch(url, {
        method: editingCandidate ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(editingCandidate ? 'Failed to update candidate' : 'Failed to add candidate');
      }

      const result = await response.json();
      
      if (editingCandidate) {
        setCandidates(prev =>
          prev.map(c => c._id === editingCandidate._id ? result : c)
        );
      } else {
        setCandidates(prev => [...prev, result]);
      }
      
      setFormOpen(false);
      setEditingCandidate(null);
    } catch (err) {
      console.error('Error saving candidate:', err);
      setError(editingCandidate ? 'Ошибка при обновлении кандидата' : 'Ошибка при добавлении кандидата');
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
          <CandidateForm
            open={formOpen}
            onClose={() => {
              setFormOpen(false);
              setEditingCandidate(null);
            }}
            onSubmit={handleSubmit}
            candidate={editingCandidate || undefined}
          />
        </Box>
      </Container>
    </Layout>
  );
} 