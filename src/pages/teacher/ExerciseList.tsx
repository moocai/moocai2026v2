import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ExerciseList() {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>{t('teacher.listaEjercicios')}</Typography>
      <Typography variant="body1" color="text.secondary">{t('teacher.sinInvitaciones')}</Typography>
    </Box>
  );
}