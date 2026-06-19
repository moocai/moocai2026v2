import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
import CourseLessons from './pages/courses/CourseLessons';
import LessonPage from './pages/courses/LessonPage';
import LessonTopic from './pages/courses/${courseId}/${lesson.id}/LessonTopic';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import { MainLayout } from './layouts/MainLayout';
import { useThemeMode } from './hooks/useTheme';

function App() {
  const { mode } = useThemeMode();
  return (
    <Box sx={{bgcolor: mode === 'fancy' ? 'transparent' : 'background.default' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
          <Route path="/courses/:courseId" element={<CourseLessons />} />
          <Route path="/courses/:courseId/:lessonId" element={<LessonPage />} />
          <Route path="/courses/:courseId/:lessonId/topic" element={<LessonTopic />} />
          <Route path="/dashboards/student" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;