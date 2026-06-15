import axios from 'axios';
import { Course, Lesson, Student } from '../types';

/* ------------------------------------------------------------------ */
/*  Tipus per als objectes de l'API                                    */
/* ------------------------------------------------------------------ */

export interface ApiCourse {
  slug: string;
  name: string;
  professors: string[];
  allows_coding: boolean;
  allows_tests: boolean;
  allows_challenges: boolean;
  active: boolean;
  is_public: boolean;
  max_ai_hints_per_day: number | null;
  ai_reviews_enabled: boolean;
}

export interface ApiTopic {
  id: number;
  slug: string;
  name: string;
  locked: boolean;
  current: boolean;
  is_exam: boolean;
  is_archived: boolean;
}

export interface ApiProblem {
  id: number;
  slug: string;
  type: 'coding' | 'test';
  difficulty: string;
  hidden: boolean;
  is_archived: boolean;
  score: number;
  precode: string;
  title: string;
  title_ca: string;
  title_es: string;
  title_en: string;
  statementHtml: string;
  statement_ca: string;
  statement_es: string;
  statement_en: string;
  checks: any[];
  examples: any[];
  system_solution: { id: number; language: string; code: string };
  choices?: { id: number; text: string; correct: boolean; order: number }[];
  choice_type?: 'multiple' | 'single';
}

export interface Submission {
  id: number;
  code: string;
  result: string;
  passed: boolean;
  created_at: string;
}

/* ------------------------------------------------------------------ */
/*  Instàncies d'axios                                                 */
/* ------------------------------------------------------------------ */

const publicApi = axios.create({
  baseURL: '/api/v1/public/courses/',
  headers: { 'Content-Type': 'application/json' },
});

const api = axios.create({
  baseURL: '/api/v1/courses/',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

/* ------------------------------------------------------------------ */
/*  Funcions auxiliars                                                 */
/* ------------------------------------------------------------------ */

const mapApiCourse = (c: ApiCourse): Course => ({
  id: c.slug,
  slug: c.slug,
  title: c.name,
  description: '',
  image: '',
  level: '',
  duration: '',
  instructor: '',
});

/* ------------------------------------------------------------------ */
/*  Servei                                                             */
/* ------------------------------------------------------------------ */

export const courseService = {

  /* ---------- Cursos ---------- */

  async getAllCourses(): Promise<Course[]> {
    const { data } = await publicApi.get<ApiCourse[]>('/');
    return data.map(mapApiCourse);
  },

  async getCourseBySlug(slug: string): Promise<ApiCourse> {
    const { data } = await api.get<ApiCourse>(`/${slug}/`);
    return data;
  },

  async getCourseAvatar(slug: string): Promise<Blob> {
    const { data } = await api.get(`/${slug}/avatar/`, { responseType: 'blob' });
    return data;
  },

  /* ---------- Topics ---------- */

  async getCourseTopics(slug: string): Promise<ApiTopic[]> {
    const { data } = await api.get<ApiTopic[]>(`/${slug}/topics/`);
    return data;
  },

  async getTopic(courseSlug: string, topicSlug: string): Promise<ApiTopic> {
    const { data } = await api.get<ApiTopic>(`/${courseSlug}/topics/${topicSlug}/`);
    return data;
  },

  /* ---------- Problemes ---------- */

  async getTopicProblems(courseSlug: string, topicSlug: string): Promise<ApiProblem[]> {
    const { data } = await api.get<ApiProblem[]>(`/${courseSlug}/topics/${topicSlug}/problems/`);
    return data;
  },

  async getProblem(courseSlug: string, topicSlug: string, problemSlug: string): Promise<ApiProblem> {
    const { data } = await api.get<ApiProblem>(`/${courseSlug}/topics/${topicSlug}/problems/${problemSlug}/`);
    return data;
  },

  /* ---------- Submissions ---------- */

  async submitChallenge(
    courseSlug: string,
    topicSlug: string,
    problemSlug: string,
    code: string,
  ): Promise<Submission> {
    const { data } = await api.post<Submission>(
      `/${courseSlug}/topics/${topicSlug}/problems/${problemSlug}/submissions/`,
      { code },
    );
    return data;
  },

  /* ---------- Estudiants ---------- */

  async getCourseStudents(slug: string): Promise<Student[]> {
    const { data } = await api.get<Student[]>(`/${slug}/students/`);
    return data;
  },

  /* ---------- Enriquit (per al dashboard) ---------- */

  async getFullCourseDetail(slug: string): Promise<any> {
    try {
      const courseData = await this.getCourseBySlug(slug);
      const topics = await this.getCourseTopics(slug);
      const content = await Promise.all(
        topics.map(async (topic) => {
          const problems = await this.getTopicProblems(slug, topic.slug);
          return {
            id: topic.slug,
            title: topic.name,
            subTopics: problems.map((p) => ({
              subtitle: p.title,
              text: p.statement_ca || p.statementHtml,
              exampleCode: p.system_solution?.code || '',
              problemSlug: p.slug,
              type: p.type,
              precode: p.precode,
              solution: p.system_solution?.code || '',
              score: p.score,
              difficulty: p.difficulty,
              checks: p.checks,
              choices: p.choices,
              choiceType: p.choice_type,
            })),
          };
        }),
      );
      return {
        ...courseData,
        id: courseData.slug || slug,
        title: courseData.name,
        content,
      };
    } catch (err) {
      console.error("getFullCourseDetail error:", err);
      throw err;
    }
  },
};
