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

  resetCourse: async (_studentId: string, courseId: string) => {
    const local = getProgress();
    Object.keys(local).forEach(key => {
      if (key.startsWith(`${courseId}_`)) delete local[key];
    });
    setProgress(local);
    return { status: 200 };
  }
};