import { Box, Stack, Typography } from '@mui/material';
import { PlayCircle, CheckCircle2 } from 'lucide-react';
import { Course, Topic } from './types';

interface Props {
  course: Course;
  dbProgress: Record<string, boolean>;
  getText: (field: any) => string;
  getCourseTopics: (course: Course) => Topic[];
  onNavigate: (path: string) => void;
  theme: any;
}

export function CourseExpandedContent({ course, dbProgress, getText, getCourseTopics, onNavigate, theme }: Props) {
  return (
    <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, marginTop: '8px' }} onClick={(e) => e.stopPropagation()}>
      <Box sx={{ bgcolor: 'background.paper', borderRadius: { xs: 1, md: 0}, border: '1px solid', borderColor: 'primary.main' + '4D', maxHeight: '350px', overflowY: 'auto' }}>
        <Box sx={{ p: 1.5 }}>
          <Stack spacing={2}>
            {getCourseTopics(course).map(topic => (
              <Box key={getText(topic.title)}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.main', mb: 0.5, display: 'block' }}>{getText(topic.title)}</Typography>
                <Stack spacing={0.5}>
                  {topic.lessons?.map(lesson => (
                    <Box key={lesson.id} onClick={() => onNavigate(`/courses/${course.id}/${lesson.id}`)} sx={{ p: 1, borderRadius: '8px', cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' }, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{getText(lesson.title)}</Typography>
                        {dbProgress[`${course.id}_${lesson.id}`] ? (<CheckCircle2 size={16} color={theme.palette.success.main} />) : (<PlayCircle size={16} color={theme.palette.primary.main} />)}
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
