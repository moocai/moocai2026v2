const getProgress = () =>
  JSON.parse(localStorage.getItem('mooc_global_progress') || '{}');

const setProgress = (data: Record<string, boolean>) =>
  localStorage.setItem('mooc_global_progress', JSON.stringify(data));

export const api = {
  getStudentProgress: async (_studentId: string) => {
    return getProgress();
  },

  postProgress: async (data: { studentId: string; courseId: string; lessonId: string; status: boolean }) => {
    const local = getProgress();
    local[`${data.courseId}_${data.lessonId}`] = data.status;
    setProgress(local);
    window.dispatchEvent(new Event('lessonProgressUpdated'));
    return { status: 200 };
  },

  resetCourse: async (studentId: string, courseId: string) => {
    const local = getProgress();
    Object.keys(local).forEach(key => {
      if (key.startsWith(`${courseId}_`)) delete local[key];
    });
    setProgress(local);

    // Netejar el codi de l'usuari per a totes les lliçons d'aquest curs
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(`code_${studentId}_${courseId}_`)) {
        localStorage.removeItem(key);
      }
      if (key.startsWith(`mooc_submissions_${courseId}_`)) {
        localStorage.removeItem(key);
      }
    });

    // Netejar última sessió si era d'aquest curs
    try {
      const lastSession = JSON.parse(localStorage.getItem('mooc_last_session') || '{}');
      if (lastSession.courseId === courseId) {
        localStorage.removeItem('mooc_last_session');
      }
    } catch {}

    window.dispatchEvent(new Event('lessonProgressUpdated'));
    return { status: 200 };
  }
};