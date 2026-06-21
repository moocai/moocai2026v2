import { useState } from 'react';
import { Box, Typography, Stack, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { ExerciseEditor } from '../../features/teacher/ExerciseEditor';
import type { Ejercicio } from '../../types';

export default function Exercises() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ejercicios: Ejercicio[] = [];

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>{t('teacher.ejercicios')}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>{t('teacher.crearCurso')}</Button>
      </Stack>
      {ejercicios.length === 0 ? (
        <Typography color="text.secondary">{t('teacher.sinInvitaciones')}</Typography>
      ) : (
        <Box />
      )}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{t('teacher.nuevoEjercicio') || t('teacher.ejercicios')}</DialogTitle>
        <DialogContent>
          <ExerciseEditor initialCode="// Write your exercise code here" hint="Add a hint for students" solution="// Solution code" />
        </DialogContent>
      </Dialog>
    </Box>
  );
}