import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Terminal, Play, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Typography, Button, IconButton, Stack, alpha, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import { api } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '../../contexts/NotificationContext';
import { courses as localCourses } from '../../data/courses';
import { exercises as localExercises } from '../../data/exercises';

interface Lesson { id: string; title: string | { ca: string; es: string; en: string }; description: string | { ca: string; es: string; en: string }; challenge: string | { ca: string; es: string; en: string }; initialCode: string | { ca: string; es: string; en: string }; solution: string | { ca: string; es: string; en: string }; exerciseInstructions?: string | { ca: string; es: string; en: string }; theoryInstructions?: string | { ca: string; es: string; en: string }; subTopics?: { subtitle: string | { ca: string; es: string; en: string }; text: string | { ca: string; es: string; en: string }; exampleCode: string; }[]; }
interface Course { id: string; title: string | { ca: string; es: string; en: string }; content: Lesson[]; }
interface Student { id: string; name: string; }
interface DataStructure { courses: Course[]; students: Student[]; }
export default function LessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { addNotification } = useNotifications();
  const [apiData] = useState<DataStructure | null>(() => ({ courses: localCourses as any[], students: [] }));
  const [loading] = useState(false);
  const [currentUser] = useState<Student | null>(() => {
    const saved = localStorage.getItem('currentStudent');
    return saved ? JSON.parse(saved) : null;
  });
  const [userInput, setUserInput] = useState("");
  const userInputRef = useRef(userInput);
  userInputRef.current = userInput;
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'pass' | 'fail'>('idle');
  const [, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [wasSavedInSession, setWasSavedInSession] = useState(false);
  const [fadeKey] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [backHidden, setBackHidden] = useState(false);

  const lang = (i18n.language?.split('-')[0]) as 'ca' | 'es' | 'en';
  const getText = (field: any): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field['ca'] || '';
  };

  const course = apiData?.courses?.find((c) => c.id === courseId);
  const baseLesson = course?.content?.find((l) => l.id === lessonId);
  const exercise = localExercises.find(e => e.id === lessonId && e.courseId === courseId);

  const handlePrevious = () => {
    if (course) navigate(`/courses/${course.id}`);
  };
  const handleNext = () => {
    if (!course) return;
    const idx = course.content?.findIndex((l) => l.id === lessonId) ?? -1;
    const nextId = idx >= 0 && idx < course.content.length - 1 ? course.content[idx + 1].id : null;
    navigate(`/courses/${course.id}${nextId ? `?lessonId=${nextId}` : ''}`);
  };
  const codeStorageKey = currentUser ? `code_${currentUser.id}_${courseId}_${lessonId}` : `temp_code_${lessonId}`;
  const getGlobalProgressKey = () => `${courseId}_${lessonId}`;

  useEffect(() => {
    if (baseLesson) {
      const savedCode = localStorage.getItem(codeStorageKey);
      setUserInput(savedCode || exercise?.initialCode || getText(baseLesson.initialCode) || '');
      const globalProgress = JSON.parse(localStorage.getItem('mooc_global_progress') || '{}');
      const key = getGlobalProgressKey();
      if (globalProgress[key]) setStatus('pass'); else setStatus('idle');
      setConsoleOutput([]); setIsDirty(false); setWasSavedInSession(false); setShowResultModal(false); setBackHidden(false);
    }
  }, [baseLesson, currentUser, courseId, lessonId]);

  // Auto-save every 10 seconds when user is typing
  useEffect(() => {
    if (!isDirty || !currentUser) return;
    const id = setInterval(() => {
      handleSaveProgress(false);
    }, 10000);
    return () => clearInterval(id);
  }, [isDirty, currentUser, codeStorageKey]);

  const handleSaveProgress = async (isAutoSaveOnPass = false) => {
    if (!currentUser || !courseId || !lessonId) return;
    setIsSaving(true);
    try {
      const globalProgress = JSON.parse(localStorage.getItem('mooc_global_progress') || '{}');
      const key = getGlobalProgressKey();
      const wasAlreadyComplete = globalProgress[key] === true;
      localStorage.setItem(codeStorageKey, userInputRef.current);
      if (isAutoSaveOnPass) {
        globalProgress[key] = true;
        localStorage.setItem('mooc_global_progress', JSON.stringify(globalProgress));
        if (!wasAlreadyComplete) {
          const currentPoints = parseInt(localStorage.getItem(`points_${currentUser.id}`) || '0');
          const newPoints = currentPoints + 10;
          localStorage.setItem(`points_${currentUser.id}`, newPoints.toString());
          setConsoleOutput(p => [...p, `🏆 +10 Punts! (Total: ${newPoints})`]);
        }
      }
      setIsDirty(false); setWasSavedInSession(true);
      setConsoleOutput(p => [...p, "💾 Sincronitzat!"]);
      await api.postProgress({ studentId: currentUser.id, courseId, lessonId, status: globalProgress[key] || false });
      window.dispatchEvent(new Event('lessonProgressUpdated'));
      addNotification(t('notifications.progress_saved'), 'success');
    } catch (err) {
      addNotification(t('notifications.progress_error'), 'error');
      setConsoleOutput(p => [...p, "⚠️ Error local"]);
    } 
    finally { setIsSaving(false); }
  };

  const handleRunTests = () => {
    setConsoleOutput(["[SISTEMA]: Executant..."]);
    const cleanUser = userInput.replace(/\s+/g, '').trim();
    const cleanSol = (exercise?.solution || getText(baseLesson?.solution)).replace(/\s+/g, '').trim() || "";
    setTimeout(() => {
      const passed = cleanUser.includes(cleanSol);
      if (passed) {
        setStatus('pass'); setConsoleOutput(p => [...p, "✅ COMPLETAT! Molt bé, pots continuar!"]);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 } });
        handleSaveProgress(true);
      } else { setStatus('fail'); setConsoleOutput(p => [...p, "❌ Revisa el codi"]); }
      if (courseId === 'Python') {
        if (currentUser) {
          const key = `mooc_submissions_${courseId}_${lessonId}`;
          const existing = JSON.parse(localStorage.getItem(key) || '[]');
          existing.unshift({ studentId: currentUser.id, studentName: currentUser.name, passed, timestamp: Date.now() });
          localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
        }
        setShowResultModal(true);
      }
    }, 800);
  };

  const handleOpenConsole = () => {
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    if (!newWindow) { setConsoleOutput(p => [...p, "⚠️ Permet les finestres emergents per obrir la consola"]); return; }
    const lines = consoleOutput.length > 0 ? consoleOutput : ["// Esperant execució..."];
    newWindow.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Consola - ${courseId}</title><style>body{margin:0;font-family:'Fira Code',Consolas,monospace;background:#000;color:#b5e853;padding:20px;font-size:14px;line-height:1.6;white-space:pre-wrap}::-webkit-scrollbar{width:8px}::-webkit-scrollbar-track{background:#111}::-webkit-scrollbar-thumb{background:#333;border-radius:4px}</style></head><body>${lines.map(l => l.replace(/</g,'&lt;').replace(/>/g,'&gt;')).join('<br>')}</body></html>`);
    newWindow.document.close();
  };

  if (loading) return <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}><CircularProgress color="secondary" /></Box>;
  if (!course || !baseLesson) return null;

  const globalProgress = course?.content?.reduce((acc, lesson) => acc + (JSON.parse(localStorage.getItem('mooc_global_progress') || '{}')[`${courseId}_${lesson.id}`] ? 1 : 0), 0) ?? 0;
  const progressPercent = course?.content?.length ? (globalProgress / course.content.length) * 100 : 0;

  // MOBILE LAYOUT - Optimized for xs
 if (isMobile) {
  return (
    <Box sx={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', bgcolor: 'background.default', color: 'text.primary', overflow: 'hidden' }}>
      {progressPercent > 0 && <Box sx={{ height: 4, bgcolor: 'action.hover' }}><Box sx={{ height: '100%', width: `${progressPercent}%`, bgcolor: 'primary.main' }} /></Box>}
      
      {/* Header */}
      <Box sx={{height: 48, borderColor: 'divider', display: 'flex', alignItems: 'center', px: 1, justifyContent: 'space-between', flexShrink: 0,mt:10}}>
      </Box>

      {/* Content - Vertical Stack */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>

        {/* 1r: ENUNCIAT */}
        <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 2, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0}}>
          <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 1, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', mb: 0.5, color: 'primary.main' }}>{t('lesson.your_challenge')}</Typography>
            <Typography sx={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 600 }}>{getText(exercise?.challenge) || getText(baseLesson.challenge)}</Typography>
                  </Box>
                  {status === 'fail' && !backHidden && (
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button onClick={() => { setShowResultModal(false); setBackHidden(true); }} sx={{ color: 'white', fontSize: 15, minWidth: 0, p: 0.5, '&:hover': { color: '#fff' } }}>{t('lesson.back')}</Button>
                  </Box>
                  )}
                </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Box sx={{ flex: 1, p: 1, position: 'relative' }}>
            {courseId === 'Python' && showResultModal ? (
              <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, bgcolor: '#1e1e1e', display: 'flex', flexDirection: 'column', p: 1.5 }}>
                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                  {consoleOutput.map((line, i) => (
                    <Typography key={i} sx={{ fontFamily: 'monospace', fontSize: '0.85rem', mb: 0.5, color: line.includes('✅') || line.includes('🏆') || line.includes('💾') ? '#4ade80' : line.includes('❌') || line.includes('Revisa') ? '#f87171' : line.includes('SISTEMA') ? '#60a5fa' : '#aaa' }}>{'>'} {line}</Typography>
                  ))}
                  {(() => {
                    const raw: any[] = JSON.parse(localStorage.getItem(`mooc_submissions_${courseId}_${lessonId}`) || '[]');
                    const others = raw.filter(s => s.studentId !== currentUser?.id).slice(0, 5);
                    if (others.length === 0) return null;
                    return (
                      <>
                        <Typography sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#888', mt: 2, mb: 1, borderTop: '1px solid #333', pt: 1 }}>ALTRES ESTUDIANTS:</Typography>
                        {others.map((s: any, i: number) => (
                          <Typography key={i} sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: s.passed ? '#4ade80' : '#f87171', mb: 0.25 }}>{s.passed ? '✅' : '❌'} {s.studentName}</Typography>
                        ))}
                      </>
                    );
                  })()}
                </Box>
              </Box>
            ) : (
              <textarea 
                value={userInput} 
                onChange={(e) => { setUserInput(e.target.value); setIsDirty(true); }} 
                style={{ width: '100%', height: '100%', background: 'transparent', color: '#b5e853', fontFamily: "'Fira Code', monospace", border: 'none', resize: 'none', fontSize: '0.85rem', outline: 'none' }} 
              />
            )}
          </Box>
          {courseId === 'Python' && status === 'fail' && !showResultModal && (
            <Box sx={{ maxHeight: 120, overflowY: 'auto', bgcolor: '#111', borderTop: '1px solid', borderColor: 'divider', p: 1 }}>
              {consoleOutput.map((line, i) => (
                <Typography key={i} sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: line.includes('✅') || line.includes('🏆') || line.includes('💾') ? '#4ade80' : line.includes('❌') || line.includes('Revisa') ? '#f87171' : line.includes('SISTEMA') ? '#60a5fa' : '#aaa' }}>{'>'} {line}</Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>

        {courseId !== 'Python' && (
        /* 3r: PROMPT (Console) */
        <Box sx={{ height: 170, display: 'flex', flexDirection: 'column', width: '100%', bgcolor: '#000', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <Box sx={{ height: 22, px: 1.5, bgcolor: '#111', display: 'flex', alignItems: 'center' }}>
          <Terminal size={10} style={{ opacity: 0.4, marginRight: 4, color: '#fff' }} />
          <Typography sx={{ fontSize: 8, color: '#888', fontWeight: 600 }}>CONSOLE</Typography>
        </Box>
        <Box sx={{ p: 1, overflowY: 'auto', flex: 1 }}>
          {consoleOutput.length === 0 && <Typography sx={{ fontSize: 9, color: '#444', fontFamily: 'monospace' }}>{`// ${t('lesson.waiting_execution')}`}</Typography>}
          {consoleOutput.map((line, i) => (
            <Typography key={i} sx={{ fontSize: 9, mb: 0.2, fontFamily: 'monospace', color: line.includes('✅') ? '#4ade80' : line.includes('❌') ? '#f87171' : '#aaa' }}>
              {'>'} {line}
            </Typography>
          ))}
          {status === 'pass' && (
            <Typography sx={{ fontSize: 9, mt: 0.5, fontFamily: 'monospace', color: '#4ade80' }}>
              {'>'} Molt bé! Ja pots passar al següent →
            </Typography>
          )}
        </Box>
      </Box>
      )}

        {/* BOTONS ESTIL */}
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, height: 70, flexShrink: 0, borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, bgcolor: 'background.paper', px: 2 }}>
        <IconButton onClick={handlePrevious} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
          <ChevronLeft size={20}/>
        </IconButton>
        <Stack direction="row" spacing={1} sx={{ flex: 1 }}>
          <Button onClick={handleRunTests} variant="contained" fullWidth sx={{fontWeight: 900, borderRadius: 1, fontSize: 13 }}>{t('lesson.run')}</Button>
        </Stack>
        <IconButton onClick={handleNext} disabled={status !== 'pass'} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5, p: 1 }}>
          <ChevronRight size={20}/>
        </IconButton>
      </Box>
    </Box>
  );
}

  // DESKTOP LAYOUT - 3 Columns
  return (
    <Box sx={{ position: 'fixed', inset: 0, height: '91.5vh', width: '100vw', display: 'flex', flexDirection: 'column', bgcolor: 'background.default', color: 'text.primary', overflow: 'hidden' , mt: 10}}>
      {/* Progress */}
      {progressPercent > 0 && <Box sx={{ height: 4, flexShrink: 0, bgcolor: 'action.hover' }}><Box sx={{ height: '100%', width: `${progressPercent}%`, bgcolor: 'primary.main' }} /></Box>}
      
      {/* Header - reduced height */}
      <Box sx={{ height: 48, flexShrink: 0, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', px: 3, justifyContent: 'space-between', bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 900, color: 'primary.main' }}>{getText(course.title).toUpperCase()}</Typography>
        </Box>
      </Box>

      {/* 3 Columnas Desktop - reduced heights */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
        {/* COLUMNA 1: Enunciat (18%) */}
        <Box sx={{ width: '20%', borderRight: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
          <Box sx={{ flex: 1, p: 2, overflowY: 'auto'}}>
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, mb: 3 , mt:3 }}>{getText(baseLesson.title)}</Typography>
            <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 1, border: '3px solid', borderColor: alpha(theme.palette.primary.main, 0.5), mt:5}}>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', mb: 0.5 }}>{t('lesson.objective')}</Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '1rem' }}>{getText(exercise?.challengeShort) || getText(baseLesson.challenge)}</Typography>
            </Box>
          </Box>
          {/* Points */}
          <Box sx={{ p: 2, bgcolor: alpha('#8400ff',0.05), borderTop: '1px solid #8400ff', textAlign: 'center' }}>
            <Trophy size={24} color="#8400ff" style={{display:'block', margin:'0 auto 4px'}} />
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: 'white' }}>{t('lesson.points_label')}</Typography>
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 900 }}>10</Typography>
          </Box>
        </Box>

        {/* COLUMNA 2: Editor (57%) - reduced header */}
        <Box ref={contentRef} sx={{ flex: courseId === 'Python' ? 1 : 'unset', width: courseId === 'Python' ? '80%' : '40%', display: 'flex', flexDirection: 'column', bgcolor: '#1e1e1e', minHeight: 0 }}>
          <Box sx={{ height: 40, px: 2, bgcolor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #333' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontSize: 11, color: '#888', fontWeight: 500 }}>{t('lesson.app_file')}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button onClick={handleOpenConsole} startIcon={<Terminal size={10}/>} sx={{ bgcolor: 'transparent', color: '#888', height: 28, fontSize: 10, fontWeight: 600, px: 1.5, borderRadius: 1, border: '1px solid #444', '&:hover': { bgcolor: '#333', color: '#fff' } }}>Consola</Button>
              <Button onClick={handleRunTests} startIcon={<Play size={10} fill="#000"/>} sx={{ bgcolor: '#fff', color: '#000', height: 28, fontSize: 10, fontWeight: 700, px: 2, borderRadius: 1 }}>{t('lesson.run')}</Button>
            </Box>
          </Box>
          <motion.div key={fadeKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ flex: 1, display: 'flex', position: 'relative' }}>
            {courseId === 'Python' && showResultModal ? (
              <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, bgcolor: '#1e1e1e', display: 'flex', flexDirection: 'column', p: 2 }}>
                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                  {consoleOutput.map((line, i) => (
                    <Typography key={i} sx={{ fontFamily: 'monospace', fontSize: '0.9rem', mb: 0.5, color: line.includes('✅') || line.includes('🏆') || line.includes('💾') ? '#4ade80' : line.includes('❌') || line.includes('Revisa') ? '#f87171' : line.includes('SISTEMA') ? '#60a5fa' : '#aaa' }}>{'>'} {line}</Typography>
                  ))}
                  {(() => {
                    const raw: any[] = JSON.parse(localStorage.getItem(`mooc_submissions_${courseId}_${lessonId}`) || '[]');
                    const others = raw.filter(s => s.studentId !== currentUser?.id).slice(0, 5);
                    if (others.length === 0) return null;
                    return (
                      <>
                        <Typography sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#888', mt: 2, mb: 1, borderTop: '1px solid #333', pt: 1 }}>ALTRES ESTUDIANTS:</Typography>
                        {others.map((s: any, i: number) => (
                          <Typography key={i} sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: s.passed ? '#4ade80' : '#f87171', mb: 0.25 }}>{s.passed ? '✅' : '❌'} {s.studentName}</Typography>
                        ))}
                      </>
                    );
                    })()}
                  <Box sx={{ textAlign: 'left', mt: 2 }}>
                    <Button onClick={() => setShowResultModal(false)} sx={{ color: '#888', fontSize: 15, minWidth: 0, p: 0.5, '&:hover': { color: '#fff' } }}>{t('lesson.back')}</Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <textarea value={userInput} onChange={(e) => { setUserInput(e.target.value); setIsDirty(true); setWasSavedInSession(false); }}
                style={{ flex: 1, background: 'transparent', color: '#b5e853', fontFamily: "'Fira Code', 'Consolas', monospace", padding: '1rem', border: 'none', outline: 'none', resize: 'none', fontSize: '0.9rem', lineHeight: 1.6, minHeight: 0 }} />
            )}
          </motion.div>
        </Box>

        {courseId !== 'Python' && (
        /* COLUMNA 3: Console (25%) - reduced header */
        <Box sx={{ width: '40%', borderLeft: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', minHeight: 0 }}>
          <Box sx={{ height: 40, px: 2, bgcolor: 'action.hover', display: 'flex', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Terminal size={14} style={{opacity: 0.4, marginRight: 6}} />
            <Typography sx={{ fontSize: 11, fontWeight: 500, color: 'text.secondary' }}>{t('lesson.debug_console')}</Typography>
          </Box>
          <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
            {consoleOutput.length === 0 && <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: 'text.disabled' }}>{`// ${t('lesson.run_code')}`}</Typography>}
            {consoleOutput.map((line, i) => (
              <Typography key={i} sx={{ fontFamily: 'monospace', fontSize: 11, mb: 0.5, color: line.includes('✅') || line.includes('🏆') || line.includes('💾') ? 'success.main' : line.includes('❌') ? 'error.main' : 'text.secondary' }}>{'> '} {line}</Typography>
            ))}
            <AnimatePresence>
              {wasSavedInSession && status === 'pass' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem' }}>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'success.main', borderRadius: 1.5, textAlign: 'center', bgcolor: alpha(theme.palette.success.main, 0.08) }}>
                    <Typography sx={{ color: 'success.main', fontWeight: 700, fontSize: '0.85rem', mb: 0.5 }}>{t('lesson.lesson_completed')}</Typography>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
        )}
      </Box>

      {/* Footer Desktop - reduced */}
      <Box sx={{ height: 56, flexShrink: 0, borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, bgcolor: 'background.paper' }}>
        <Button onClick={handlePrevious} variant="outlined" sx={{ minWidth: 120, minHeight: 36, fontSize: '0.85rem' }}><ChevronLeft size={18}/> {t('lesson.previous')}</Button>
        <Button onClick={handleNext} disabled={status !== 'pass'} variant="outlined" sx={{ minWidth: 120, minHeight: 36, fontSize: '0.85rem' }}>{t('lesson.next')} <ChevronRight size={18}/></Button>
      </Box>
    </Box>
  );
}