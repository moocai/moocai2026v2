import { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { CourseForm } from '../../features/teacher/CourseForm';
import type { Curso } from '../../types';

export default function Courses() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const cursos: Curso[] = [];

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>{t('teacher.cursos')}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>{t('teacher.crearCurso')}</Button>
      </Stack>
      {cursos.length === 0 && <Typography color="text.secondary">{t('teacher.sinInvitaciones')}</Typography>}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('teacher.crearCurso')}</DialogTitle>
        <DialogContent>
          <CourseForm onSubmit={() => { setOpen(false); }} onCancel={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}