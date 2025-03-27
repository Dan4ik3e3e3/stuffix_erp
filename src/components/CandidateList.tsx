import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { ICandidate } from '@/models/Candidate';
import CandidateForm from './CandidateForm';

interface CandidateListProps {
  candidates: ICandidate[];
  onEdit: (candidate: ICandidate) => void;
  onDelete: (id: string) => void;
  onAdd: (candidate: Partial<ICandidate>) => void;
}

export default function CandidateList({ candidates, onEdit, onDelete, onAdd }: CandidateListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const filteredCandidates = candidates.filter((candidate) =>
    Object.values(candidate).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAddClick = () => {
    setIsAddFormOpen(true);
  };

  const handleAddSubmit = (data: Partial<ICandidate>) => {
    onAdd(data);
    setIsAddFormOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mr: 1 }}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Добавить кандидата
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ФИО</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Должность</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <TableRow key={candidate._id}>
                  <TableCell>{candidate.fullName}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.phone}</TableCell>
                  <TableCell>{candidate.position}</TableCell>
                  <TableCell>{candidate.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEdit(candidate)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(candidate._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography align="center">
                    {searchTerm
                      ? 'Кандидаты не найдены'
                      : 'Нет добавленных кандидатов'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CandidateForm
        open={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddSubmit}
      />
    </Box>
  );
} 