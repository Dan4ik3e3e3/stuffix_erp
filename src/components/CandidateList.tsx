import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Box,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { ICandidate } from '@/models/Candidate';

const statusColors = {
  new: 'default',
  contacted: 'info',
  interview: 'warning',
  offer: 'secondary',
  hired: 'success',
  rejected: 'error',
} as const;

const statusLabels = {
  new: 'Новый',
  contacted: 'Связались',
  interview: 'Интервью',
  offer: 'Оффер',
  hired: 'Нанят',
  rejected: 'Отказ',
} as const;

interface CandidateListProps {
  candidates: ICandidate[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export default function CandidateList({ candidates, onEdit, onDelete, onAdd }: CandidateListProps) {
  const [search, setSearch] = React.useState('');
  const [filteredCandidates, setFilteredCandidates] = React.useState(candidates);

  React.useEffect(() => {
    const filtered = candidates.filter((candidate) =>
      candidate.fullName.toLowerCase().includes(search.toLowerCase()) ||
      candidate.position.toLowerCase().includes(search.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredCandidates(filtered);
  }, [search, candidates]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          placeholder="Поиск по имени, должности или навыкам"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: '40%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          Добавить кандидата
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ФИО</TableCell>
              <TableCell>Должность</TableCell>
              <TableCell>Навыки</TableCell>
              <TableCell>Опыт</TableCell>
              <TableCell>Зарплата</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate._id?.toString()}>
                <TableCell>{candidate.fullName}</TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {candidate.skills.map((skill) => (
                      <Chip key={skill} label={skill} size="small" />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{candidate.experience} лет</TableCell>
                <TableCell>
                  {candidate.salary.min.toLocaleString()} - {candidate.salary.max.toLocaleString()} {candidate.salary.currency}
                </TableCell>
                <TableCell>
                  <Chip
                    label={statusLabels[candidate.status]}
                    color={statusColors[candidate.status]}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(candidate._id?.toString() ?? '')}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(candidate._id?.toString() ?? '')}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 