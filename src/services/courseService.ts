import axios from 'axios';
import { Course } from '../types';

/* ------------------------------------------------------------------ */
/* Configuració d'URL (Blindada)                                     */
/* ------------------------------------------------------------------ */
// Utilitzem 'as any' per evitar l'error de TypeScript de "Property 'env' does not exist"
const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'https://algorien.com';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ------------------------------------------------------------------ */
/* Servei                                                            */
/* ------------------------------------------------------------------ */
export const courseService = {
  
  async getAllCourses(): Promise<Course[]> {
    const { data } = await apiClient.get('/public/courses/');
    // Comprovació per assegurar que rebem un array
    const list = Array.isArray(data) ? data : (data.results || []);
    
    return list.map((c: any) => ({
      id: c.slug,
      slug: c.slug,
      title: c.name,
      description: '',
      image: '',
      level: '',
      duration: '',
      instructor: '',
    }));
  },

  async getCourseBySlug(slug: string): Promise<any> {
    const { data } = await apiClient.get(`/courses/${slug}/`);
    return data;
  },

  async getCourseTopics(slug: string): Promise<any[]> {
    const { data } = await apiClient.get(`/courses/${slug}/topics/`);
    return Array.isArray(data) ? data : (data.results || []);
  },

  async getTopicProblems(courseSlug: string, topicSlug: string): Promise<any[]> {
    const { data } = await apiClient.get(`/courses/${courseSlug}/topics/${topicSlug}/problems/`);
    return Array.isArray(data) ? data : (data.results || []);
  },

  async submitChallenge(courseSlug: string, challengeSlug: string, code: string): Promise<any> {
    const file = new File([code], 'submission.csv', { type: 'text/csv' });
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await apiClient.post(
      `/courses/${courseSlug}/challenges/${challengeSlug}/submissions/`,
      formData
    );
    return data;
  },

  /** @deprecated Use submitChallenge instead */
  async submitSubmission(courseSlug: string, challengeSlug: string, code: string): Promise<any> {
    return this.submitChallenge(courseSlug, challengeSlug, code);
  },

  async getFullCourseDetail(slug: string): Promise<any> {
    try {
      const [courseData, topics] = await Promise.all([
        this.getCourseBySlug(slug),
        this.getCourseTopics(slug),
      ]);

      const content = await Promise.all(
        topics.map(async (topic: any) => {
          const problems = await this.getTopicProblems(slug, topic.slug);
          return {
            id: topic.slug,
            title: topic.name,
            subTopics: Array.isArray(problems) ? problems.map((p: any) => ({
              subtitle: p.title,
              text: p.statement_ca || p.statementHtml || '',
              problemSlug: p.slug,
              type: p.type,
              precode: p.precode,
              solution: p.system_solution?.code || '',
              score: p.score,
              difficulty: p.difficulty,
            })) : [],
          };
        })
      );

      return { 
        ...courseData, 
        id: courseData.slug, 
        title: courseData.name, 
        content 
      };
    } catch (err) {
      console.error("Error al carregar el detall del curs:", err);
      throw err;
    }
  },
};