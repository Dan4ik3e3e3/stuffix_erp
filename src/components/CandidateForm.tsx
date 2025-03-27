import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Autocomplete,
  Box,
} from '@mui/material';
import { ICandidate } from '@/models/Candidate';

interface CandidateFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ICandidate>) => void;
  candidate?: ICandidate;
}

const statusOptions = [
  { value: 'new', label: 'Новый' },
  { value: 'contacted', label: 'Связались' },
  { value: 'interview', label: 'Интервью' },
  { value: 'offer', label: 'Оффер' },
  { value: 'hired', label: 'Нанят' },
  { value: 'rejected', label: 'Отказ' },
];

export default function CandidateForm({ open, onClose, onSubmit, candidate }: CandidateFormProps) {
  const [formData, setFormData] = React.useState<Partial<ICandidate>>(
    candidate || {
      fullName: '',
      email: '',
      phone: '',
      position: '',
      status: 'new',
      skills: [],
      experience: 0,
      salary: {
        min: 0,
        max: 0,
        currency: 'RUB',
      },
      location: '',
      notes: '',
    }
  );

  const handleChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof ICandidate],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {candidate ? 'Редактировать кандидата' : 'Добавить кандидата'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ФИО"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Телефон"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Должность"
                value={formData.position}
                onChange={(e) => handleChange('position', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.skills}
                onChange={(_, newValue) => handleChange('skills', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Навыки"
                    placeholder="Добавить навык"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Опыт (лет)"
                type="number"
                value={formData.experience}
                onChange={(e) => handleChange('experience', Number(e.target.value))}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Статус"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                required
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Зарплата (от)"
                type="number"
                value={formData.salary?.min}
                onChange={(e) => handleChange('salary.min', Number(e.target.value))}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Зарплата (до)"
                type="number"
                value={formData.salary?.max}
                onChange={(e) => handleChange('salary.max', Number(e.target.value))}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                fullWidth
                label="Валюта"
                value={formData.salary?.currency}
                onChange={(e) => handleChange('salary.currency', e.target.value)}
                required
              >
                <MenuItem value="RUB">RUB</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Местоположение"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Заметки"
                multiline
                rows={4}
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained">
            {candidate ? 'Сохранить' : 'Добавить'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 