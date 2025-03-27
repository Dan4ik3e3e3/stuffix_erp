import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Box } from '@mui/material';
import Navigation from '@/components/Navigation';
import CandidateList from '@/components/CandidateList';
import CandidateForm from '@/components/CandidateForm';
import { ICandidate } from '@/models/Candidate';
import connectDB from '@/lib/db';

interface CandidatesPageProps {
  initialCandidates: ICandidate[];
}

export default function CandidatesPage({ initialCandidates }: CandidatesPageProps) {
  const [candidates, setCandidates] = React.useState<ICandidate[]>(initialCandidates);
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingCandidate, setEditingCandidate] = React.useState<ICandidate | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleAdd = () => {
    setEditingCandidate(null);
    setFormOpen(true);
  };

  const handleEdit = (candidate: ICandidate) => {
    setEditingCandidate(candidate);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/candidates?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCandidates((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
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

      if (response.ok) {
        const result = await response.json();
        
        if (editingCandidate) {
          setCandidates((prev) =>
            prev.map((c) =>
              c._id === editingCandidate._id ? { ...result } : c
            )
          );
        } else {
          setCandidates((prev) => [...prev, result]);
        }
        
        setFormOpen(false);
        setEditingCandidate(null);
      }
    } catch (error) {
      console.error('Error saving candidate:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <CandidateList
          candidates={candidates}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  await connectDB();
  const Candidate = (await import('@/models/Candidate')).Candidate;
  const candidates = await Candidate.find().lean();

  return {
    props: {
      initialCandidates: JSON.parse(JSON.stringify(candidates)),
    },
  };
}; 