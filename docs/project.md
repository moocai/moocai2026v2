# MOOC React 2026
**Última actualització: 1 de juny de 2026**
---

## 1. Tecnologies i Dependències

| Categoria | Llibreria | Versió | Ús |
|-----------|-----------|--------|-----|
| **Framework** | React | ^18.3.1 | Components i hooks |
| **Build** | Vite | ^6.0.0 | Dev server i bundling |
| **UI** | @mui/material | ^9.0.0 | Components Material Design + CssBaseline |
| **Estils** | @emotion/react, @emotion/styled | ^11.14.0 / ^11.14.1 | Estils CSS-in-JS |
| **Icons** | @mui/icons-material + lucide-react | ^9.0.0 / ^0.577.0 | Icones |
| **Routing** | react-router-dom | ^6.30.3 | Navegació SPA (v7 futures flags) |
| **Animacions** | framer-motion | ^12.38.0 | Animacions declaratives |
| **Internacionalització** | i18next + react-i18next + i18next-browser-languagedetector | ^26.0.6 / ^17.0.4 / ^8.2.1 | Multiidioma (CA, ES, EN) |
| **HTTP** | axios | ^1.15.0 | Peticions a API REST |
| **Confetti** | canvas-confetti | ^1.9.2 | Animació en completar lliçons |
| **Util** | clsx, class-variance-authority | ^2.1.1 / ^0.7.1 | Classes condicionals |
| **Util** | tailwind-merge, tailwindcss-animate, tw-animate-css | ^3.5.0 / ^1.0.7 / ^1.4.0 | Utilitats Tailwind (instal·lades) |
| **Tipus** | TypeScript | ^5.5.0 | Tipat estàtic |
| **Dev** | @vitejs/plugin-react, postcss, autoprefixer, tailwindcss | — | Configuració build |

---

## 2. Estructura Completa del Projecte

```
src/
├── App.css                         # Estils legacy (.counter, .hero, ticks, etc.)
├── App.tsx                         # Router principal amb rutes (Home, Courses, Dashboard)
├── env.d.ts                        # Declaracions de tipus per a fitxers estàtics (.css, .svg, .png, .webp)
├── i18n.ts                         # Configuració i18next (punt d'entrada, duplicat de i18n/index.ts)
├── index.css                       # Scrollbar styling, CSS variables, animació shake
├── main.tsx                        # Punt d'entrada (BrowserRouter + StyledEngineProvider + ThemeProvider)
│
├── components/                     # Components reutilitzables
│   ├── CourseCard.tsx              # Targeta de curs (Home)
│   ├── Footer.tsx                  # Peu de pàgina multi-columna
│   ├── Header.tsx                  # Barra de navegació sticky amb menú mòbil overlay
│   ├── Hero.tsx                    # Secció hero amb typewriter + stats + ParticlesBackground
│   ├── LanguageSwitcher.tsx        # Canviador d'idioma (CA/ES/EN)
│   ├── ParticlesBackground.tsx     # Fons interactiu amb Canvas (partícules + connexió)
│   ├── ThemeToggleButton.tsx       # Botó mode clar/fosc (Sun/Moon icons)
│   └── ui/                         # Components base
│       ├── badge.tsx               # Badge (standard/outline) basat en MUI Chip
│       ├── Card.tsx                # Wrapper MUI Card amb blur, border, hover effects
│       ├── ProgressBar.tsx         # (BUIT)
│       └── SearchInput.tsx         # (BUIT)
│
├── contexts/                       # Contextos React
│   ├── AuthContext.tsx             # Autenticació (login/logout/token/user) - CREAT però NO usat a main.tsx
│   ├── I18nContext.tsx             # Idioma (persistència localStorage clau mooc-language)
│   └── ThemeContext.tsx            # Tema clar/fosc (persistència localStorage clau mooc-theme-mode)
│
├── data/                           # Dades estàtiques
│   ├── courses.ts                  # Cursos (Python 13 lliçons, React 2, Spring Boot 2 deshab., ML 2 deshab.)
│   ├── exercises.ts                # 17 exercicis (initialCode + solution) per curs/lliçó
│   └── students.ts                 # 3 estudiants predefinits (Marc/1, Jordi/2, Miquel/3)
│
├── features/                       # Components agrupats per funció
│   ├── student/
│   │   ├── CourseCard.tsx          # Card de curs al dashboard (expansible, progress icons)
│   │   ├── CourseExpandedContent.tsx # Contingut expandit (tabs syllabus/activities)
│   │   ├── CourseIcon.tsx          # Icona dinàmica Lucide per nom de curs
│   │   ├── Login.tsx               # Formulari login amb role toggle + create user + student grid
│   │   ├── ProgressOverview.tsx    # Barres LinearProgress per curs
│   │   ├── RankingCard.tsx         # Rànquing amb Tabs per curs, usuari actiu destacat
│   │   ├── ScrollIndicator.tsx     # Indicador scroll mòbil (chevrons animats)
│   │   ├── StudentCard.tsx         # Targeta login per PIN amb delete confirmation flow
│   │   ├── StudentProfileCard.tsx  # Perfil (avatar, nom, punts, logout)
│   │   └── types.ts                # Interfícies Student, Lesson, Topic, Course
│   │
│   └── teacher/                    # (TOT BUIT)
│       ├── ChatWidget.tsx
│       ├── CourseForm.tsx
│       ├── ExerciseEditor.tsx
│       ├── StatsCards.tsx
│       ├── StudentFilters.tsx
│       └── StudentTable.tsx
│
├── hooks/                          # Hooks personalitzats
│   ├── useI18n.ts                  # Re-exporta I18nProvider + useI18n
│   ├── useTeacherData.ts           # (BUIT)
│   └── useTheme.ts                 # Re-exporta ThemeProvider + useThemeMode
│
├── i18n/                           # Traduccions
│   ├── ca.ts                       # Català (auth, dashboard, home, hero, footer, course, lesson)
│   ├── en.ts                       # Anglès
│   ├── es.ts                       # Castellà
│   └── index.ts                    # Configuració i18next (LanguageDetector, fallback 'ca')
│
├── layouts/                        # Layouts per a rutes
│   ├── MainLayout.tsx              # Header + Outlet + Footer
│   └── TeacherLayout.tsx           # (BUIT)
│
├── middleware/                      # (BUIT - directori buit)
│
├── pages/                          # Pàgines de l'aplicació
│   ├── Home.tsx                    # Landing: Hero, cursos (courseService), features, Footer
│   ├── courses/
│   │   ├── ${courseId}/
│   │   │   └── ${lesson.id}/
│   │   │       └── LessonTopic.tsx # Vista teòrica: sidebar lliçons + explicació + challenge
│   │   ├── CourseLessons.tsx       # 3 columnes: syllabus accordion + contingut + "On this page"
│   │   └── LessonPage.tsx          # Editor codi interactiu (4 modes, tests, confetti, submissions)
│   ├── dashboards/
│   │   └── StudentDashboard.tsx    # Login/creació usuaris, perfil, progrés, cursos, rànquing
│   └── teacher/                    # (TOT BUIT)
│       ├── Courses.tsx
│       ├── Dashboard.tsx
│       ├── Exercises.tsx
│       └── Students.tsx
│
├── services/                       # Capa d'accés a dades
│   ├── api.ts                      # Client axios (progress CRUD híbrid local + API)
│   ├── authService.ts              # Login/logout/getMe (només API, sense fallback local)
│   ├── courseService.ts            # CRUD cursos/lliçons amb fallback a data/courses.ts
│   └── teacherService.ts           # (BUIT)
│
├── theme/
│   └── Theme.ts                    # getTheme(mode) per a MUI (primary #8400ff, secondary #ec4899)
│
├── types/
│   └── index.ts                    # Interfícies globals (Course, Lesson, Student, etc.)
│
└── utils/                          # Utilitats
    ├── formatters.ts               # Text, progress, points, timestamps
    ├── utils.ts                    # sx() per composar estils MUI
    └── validators.ts               # validatePin, isValidEmail, validateCodeSolution, etc.
```

### Fitxers d'Arrel

| Fitxer | Propòsit |
|--------|----------|
| `index.html` | HTML entry point (meta description "LEARN LANGUAGES 2026") |
| `vite.config.ts` | Configuració Vite + React plugin + `@` alias + manualChunks + sourcemap |
| `tsconfig.json` | Configuració TypeScript amb `@/*` path alias |
| `package.json` | Dependències i scripts (dev, build, preview) |
| `.gitignore` | Fitxers ignorats per git |

### Public

| Fitxer | Propòsit |
|--------|----------|
| `public/img/logo.webp` | Logo de l'aplicació |
| `public/img/Python.svg` | Logo del curs Python |
| `public/img/React.svg` | Logo del curs React |
| `public/img/SB.svg` | Logo del curs Spring Boot |
| `public/img/ml.svg` | Logo del curs Machine Learning |
| `public/_redirects` | Regles de redirect per SPA (Netlify) |
| `public/robots.txt` | Configuració SEO |

---

## 3. Responsabilitat de Cada Fitxer

### Punt d'Entrada

| Fitxer | Funció actual | Per fer |
|--------|---------------|---------|
| `main.tsx` | Renderitza `<App />` amb BrowserRouter (v7_startTransition + v7_relativeSplatPath) + StyledEngineProvider + ThemeProvider | (completat) |
| `App.tsx` | Router: rutes `/` (Home), `/courses/:courseId` (CourseLessons), `/courses/:courseId/:lessonId` (LessonPage), `/dashboards/student` (StudentDashboard). MainLayout wrapper per courses i dashboard | (completat) |

### Components (`src/components/`)

| Fitxer | Exportacions | Funcions clau |
|--------|-------------|---------------|
| `Header.tsx` | `Header` | `scrollToDynamic(desktopPx, mobilePx)`, `handleLogout()`, `checkAuth()`, menú mòbil overlay amb AnimatePresence |
| `Hero.tsx` | `Hero (default)` | Typewriter animat (React, Python, SpringBoot, ML), stats de courses/students locals, scroll chevrons |
| `Footer.tsx` | `Footer` | `FooterLink` (component intern), any dinàmic, 4 columnes (logo, explore, community, connect) |
| `CourseCard.tsx` | `CourseCard` | `handleEnroll()`, `getLocalizedText()`, disabled overlay "PROPERAMENT" |
| `ParticlesBackground.tsx` | `ParticlesBackground (default)` | Classe `Particle` amb `draw()` i `update()`, `connect()`, detecció dark/light mode |
| `ThemeToggleButton.tsx` | `ThemeToggleButton` | Alterna mode clar/fosc via `useThemeMode()` (Sun/Moon icons) |
| `LanguageSwitcher.tsx` | `LanguageSwitcher` | Canvia idioma via `i18n.changeLanguage()` |

### Components UI (`src/components/ui/`)

| Fitxer | Exportacions |
|--------|-------------|
| `Card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` (MUI wrappers amb blur i hover) |
| `badge.tsx` | `Badge` (mode `standard` / `outline`) basat en MUI Chip |
| `ProgressBar.tsx` | (BUIT) |
| `SearchInput.tsx` | (BUIT) |

### Contexts (`src/contexts/`)

| Fitxer | Provider | Hook | Funcions |
|--------|----------|------|----------|
| `AuthContext.tsx` | `AuthProvider` | `useAuth()` | `login(credentials)`, `logout()`, estat: `user`, `token`, `isAuthenticated`, `loading` (NO connectat a main.tsx) |
| `I18nContext.tsx` | `I18nProvider` | `useI18n()` | `setLanguage(lang)`, estat: `language` (persistit a localStorage clau `mooc-language`) |
| `ThemeContext.tsx` | `ThemeProvider` | `useThemeMode()` | `toggleTheme()`, `setMode(mode)`, estat: `mode` (persistit a localStorage clau `mooc-theme-mode`) |

### Dades Estàtiques (`src/data/`)

| Fitxer | Interfície | Contingut |
|--------|-----------|-----------|
| `courses.ts` | `Course`, `LessonContent`, `SubTopic` | 4 cursos: Python (13 lliçons), React (2 lliçons), Spring Boot (2, deshabilitat), Machine Learning (2, deshabilitat). Cada lliçó amb subtopics multiidioma i exampleCode |
| `exercises.ts` | `Exercise` | 17 exercicis (13 Python, 2 React, 1 Spring Boot, 1 ML) amb `initialCode`, `solution`, `challenge`, `exerciseInstructions` multiidioma |
| `students.ts` | `Student` | 3 estudiants predefinits amb PIN: Marc (1), Jordi (2), Miquel (3) |

### Features Student (`src/features/student/`)

| Fitxer | Exportació | Props / Funcions |
|--------|-----------|------------------|
| `types.ts` | `Student`, `Lesson`, `Topic`, `Course` | Interfícies compartides (Student amb role opcional) |
| `Login.tsx` | `Login` | Role toggle (student/teacher), create-user form (name, email, PIN), grid de StudentCards, gestió usuaris locals + IDs eliminats via localStorage |
| `CourseCard.tsx` | `CourseCard` | `onToggle`, `onResetCourse`, `onNavigate`, rep `course`, `isExpanded`, `dbProgress`, disabled overlay |
| `CourseExpandedContent.tsx` | `CourseExpandedContent` | Tabs syllabus/activities, llista lliçons amb icones (BookOpen/CheckCircle/PlayCircle), posicionament absolut |
| `CourseIcon.tsx` | `CourseIcon` | Retorna icona Lucide (Terminal, Globe, Cpu, Layers, Database, Code2) segons el nom del curs |
| `ProgressOverview.tsx` | `ProgressOverview` | Barres `LinearProgress` per curs amb percentatge |
| `RankingCard.tsx` | `RankingCard` | Tabs per curs, llistat ordenat per progrés, usuari actiu destacat, icones Trophy |
| `ScrollIndicator.tsx` | `ScrollIndicator` | 3 chevrons animats a cada costat (només mòbil) |
| `StudentCard.tsx` | `StudentCard` | Login per PIN, delete confirmation flow amb PIN (TextField + confirm/cancel), animació error shake |
| `StudentProfileCard.tsx` | `StudentProfileCard` | Avatar, nom, punts totals, botó logout, LinearProgress loading bar |

### Features Teacher (`src/features/teacher/`)

TOTS ELS FITXERS estan BUITS (pendents d'implementar):
- `ChatWidget.tsx`, `CourseForm.tsx`, `ExerciseEditor.tsx`, `StatsCards.tsx`, `StudentFilters.tsx`, `StudentTable.tsx`

### Pàgines (`src/pages/`)

| Fitxer | Exportació | Funcions clau |
|--------|-----------|---------------|
| `Home.tsx` | (default) | Carrega cursos via `courseService.getAllCourses()` amb loading/error, 6 feature cards localitzades, visibility change listener |
| `courses/CourseLessons.tsx` | (default) | Layout 3 columnes: syllabus accordion + contingut (breadcrumb, course info, subTopics amb code examples) + "On this page" anchor links. Drawer mòbil per syllabus |
| `courses/LessonPage.tsx` | (default) | Editor codi interactiu. 4 modes (normal/drill/assist/hackathon), tests (cleanUser.includes(cleanSol)), confetti, submissions, localStorage progress. Mostra submissions d'altres estudiants per Python |
| `courses/${courseId}/${lesson.id}/LessonTopic.tsx` | (default) | Sidebar llista lliçons (filtrada a l'actual), explicació teòrica, challenge box, exercise instructions, navegació prev/next/go-to-activity |
| `dashboards/StudentDashboard.tsx` | (default) | Login/create-user flow, profile card, progress overview, course grid expansible, ranking per tabs. Integra dades locals + API progress sync |
| `teacher/Courses.tsx` | (BUIT) | |
| `teacher/Dashboard.tsx` | (BUIT) | |
| `teacher/Exercises.tsx` | (BUIT) | |
| `teacher/Students.tsx` | (BUIT) | |

### Serveis (`src/services/`)

| Fitxer | Objecte | Mètodes | API Endpoints |
|--------|---------|---------|---------------|
| `api.ts` | `api` | `getStudentProgress(studentId)` (fusiona local + API), `postProgress(data)` (local + intent API), `resetCourse(studentId, courseId)` (local + API) | `GET /api/progress/{id}`, `POST /api/progress`, `DELETE /api/progress/{sid}/{cid}` |
| `authService.ts` | `authService` | `login(credentials)` (només API, sense fallback local), `logout()`, `getMe()` (API amb fallback localStorage), `getCurrentUser()` | `POST /api/users/auth/login/`, `POST /api/users/auth/logout/`, `GET /api/users/me/settings/` |
| `courseService.ts` | `courseService` | `getAllCourses()`, `getCourseBySlug(slug)`, `getCourseLessons(slug)`, `getCourseStudents(slug)`, `submitChallenge(...)` | `GET /api/v1/courses/`, `GET /api/v1/courses/{slug}/`, `GET /api/v1/courses/{slug}/topics/`, `GET /api/v1/courses/{slug}/students/`, `POST /api/v1/courses/{slug}/topics/{t}/problems/{p}/submissions/` |
| `teacherService.ts` | (BUIT) | | |

### Theme (`src/theme/`)

| Fitxer | Exportacions | Colors |
|--------|-------------|--------|
| `Theme.ts` | `getTheme(mode)` | **Dark**: primary `#8400ff` (porpra), secondary `#ec4899` (rosa), bg `#0a0a0a`; **Light**: primary `#8400ff`, secondary `#ec4899`, bg `#f5f5f5`. Font Inter, borderRadius 12px |

### Hooks (`src/hooks/`)

| Fitxer | Contingut |
|--------|-----------|
| `useI18n.ts` | Re-exporta `{ I18nProvider, useI18n }` |
| `useTheme.ts` | Re-exporta `{ ThemeProvider, useThemeMode }` |
| `useTeacherData.ts` | (BUIT) |

### Utils (`src/utils/`)

| Fitxer | Funcions |
|--------|----------|
| `formatters.ts` | `getLocalizedText(field, lang)`, `getBaseLanguage(locale)`, `formatProgressPercent(done, total)`, `calculatePoints(completed)`, `padNumber(num)`, `formatTimestamp(timestamp)`, `makeProgressKey(courseId, lessonId)` |
| `utils.ts` | `sx()` per composar estils MUI |
| `validators.ts` | `validatePin(student, pin)`, `validateRequiredFields(fields)`, `isValidPin(pin)` (4-digit regex), `isValidEmail(email)`, `validateCodeSolution(userInput, expectedSolution)` (whitespace-normalized) |

### Traduccions (`src/i18n/`)

| Fitxer | Seccions |
|--------|----------|
| `ca.ts` (116 línies) | auth, dashboard, home (features, why_choose), hero (stats, subtitle, scroll_down), footer (brand_tagline, explore, community, connect, copyright), course (enroll, by), common (errors), lesson (syllabus, run, debug, objective, challenge, points, etc.) |
| `es.ts` (122 línies) | Mateixes seccions en castellà |
| `en.ts` (118 línies) | Mateixes seccions en anglès |
| `index.ts` (24 línies) | Configuració i18next amb LanguageDetector, initReactI18next, fallback 'ca' |
| `i18n.ts` (24 línies, arrel) | Duplicat de la configuració (punt d'entrada des de main.tsx) |

---

## 4. Flux de Dades Actual

### Fonts de Dades

1. **`src/data/courses.ts`** - Font principal de dades de cursos (usada per CourseLessons, LessonTopic, StudentDashboard, Hero stats)
2. **`src/data/exercises.ts`** - Dades d'exercicis (usada per LessonPage, LessonTopic)
3. **`src/data/students.ts`** - Estudiants predefinits (usada per StudentDashboard/Login)
4. **API REST** - `http://localhost:8080/api` (amb fallback a dades locals si no respon per courseService)
5. **localStorage** - Claus:
   - `mooc_global_progress` - Progrés de lliçons completades (`{courseId_lessonId: true}`)
   - `code_{userId}_{courseId}_{lessonId}` - Codi guardat per usuari/lliçó
   - `points_{userId}` - Punts acumulats
   - `currentStudent` - Estudiant amb sessió activa
   - `mooc_local_students` - Estudiants creats localment
   - `mooc_deleted_ids` - IDs d'estudiants eliminats
   - `mooc_submissions_{courseId}_{lessonId}` - Submissions d'estudiants
   - `mooc-theme-mode` - Preferència de tema clar/fosc
   - `mooc-language` - Preferència d'idioma
   - `token` - Token d'autenticació API

### Flux del Progrés

```
LessonPage
  │
  ├── handleRunTests()
  │     ├── Compara userInput amb solution (remove spaces + includes)
  │     ├── Si passa: confetti + +10 punts (localStorage)
  │     └── Guarda submissions a mooc_submissions_{courseId}_{lessonId}
  │
  ├── handleSaveProgress()
  │     ├── Desa codi a localStorage (codeStorageKey)
  │     ├── Marca lliçó completada a mooc_global_progress
  │     ├── Suma punts a points_{userId}
  │     └── api.postProgress() → intenta API → si falla, només local
  │
  └── Dispara event 'lessonProgressUpdated' → CourseLessons i StudentDashboard el reben
```

### Flux d'Autenticació

```
StudentDashboard / Login
  │
  ├── handleLogin(student, pin)
  │     ├── Compara student.code === pin (validació local)
  │     ├── Si OK: desa a localStorage (currentStudent)
  │     └── Dispara event 'auth-state-change' → Header el rep
  │
  └── authService.login(credentials)
        ├── Intenta POST /api/users/auth/login/
        └── Sense fallback (error si API no disponible)
```

### Gestió d'Estudiants Locals

```
Login
  ├── Llegeix students.ts + mooc_local_students (fusiona)
  ├── Filtra IDs eliminats (mooc_deleted_ids)
  ├── handleCreateStudent() → afegeix a mooc_local_students
  └── handleDeleteStudent() → afegeix ID a mooc_deleted_ids + neteja locals
```

---

## 5. Estat Actual del Projecte

### Implementat (Funcional)
- ✅ Components UI (Header amb menú mòbil, Hero amb typewriter, Footer, CourseCard, ParticlesBackground)
- ✅ Context d'idioma (I18nContext) + suport multiidioma (CA/ES/EN)
- ✅ Context de tema (ThemeContext) + mode clar/fosc (persistit a localStorage)
- ✅ Context d'autenticació (AuthContext) - Provider creat però NO connectat a main.tsx
- ✅ StudentDashboard complet (login/create-user, perfil, progrés, rànquing, cursos expansibles)
- ✅ CourseLessons (layout 3 columnes amb syllabus accordion + contingut + anchor links, drawer mòbil)
- ✅ LessonPage (editor codi amb 4 modes, tests per inclusió, confetti, submissions, localStorage)
- ✅ LessonTopic (vista teòrica amb sidebar lliçons + explicació + challenge + navegació)
- ✅ Serveis API amb fallback local (courseService) o sense (authService)
- ✅ Dades estàtiques completes (courses.ts 13 lliçons Python, exercises.ts 17 exercicis, students.ts)
- ✅ Utils (formatters, validators, sx compositor)
- ✅ `main.tsx` i `App.tsx` - Connectats amb BrowserRouter (v7 flags), StyledEngineProvider, ThemeProvider
- ✅ `MainLayout.tsx` - En ús com a layout route (Header + Outlet + Footer)
- ✅ `vite.config.ts` - Configurat amb `@` alias, manualChunks, sourcemap
- ✅ Theme personalitzat (colors porpra #8400ff / rosa #ec4899)
- ✅ Gestió d'estudiants locals (crear, eliminar, persistència)

### Per Implementar
- ❌ Pàgines de teacher (Courses, Dashboard, Exercises, Students)
- ❌ Components de teacher (ChatWidget, CourseForm, ExerciseEditor, StatsCards, StudentFilters, StudentTable)
- ❌ `middleware/`
- ❌ `ProgressBar.tsx`, `SearchInput.tsx`
- ❌ `useTeacherData.ts`, `teacherService.ts`, `TeacherLayout.tsx`
- ❌ `AuthContext` no està connectat a l'app (main.tsx no l'importa)

### Observacions
- `AuthContext` està creat però no s'usa (StudentDashboard i Header fan servir localStorage directament)
- `authService.login()` ja no té fallback local (només API, llança error si no disponible)
- `courseService.ts` encara té fallback a `data/courses.ts` quan l'API no respon
- `api.ts` té un sistema híbrid (localStorage + API) per al progrés
- `main.tsx` no inclou `AuthProvider` ni `I18nProvider` (només BrowserRouter + StyledEngineProvider + ThemeProvider)
- `i18n.ts` (arrel) i `i18n/index.ts` són duplicats (ambdós configuren i18next)
- `public/data.json` ha estat eliminat (ja no existeix)
- Tots els components de StudentDashboard estan desacoblats a `features/student/`
- El projecte utilitza Vite 6 amb `@` path alias

---

## 6. APIs Utilitzades

### API REST (Backend esperat a `API ISAAC`)

| Mètode | Endpoint | Ús | Servei |
|--------|----------|-----|--------|
| GET | `/api/progress/{studentId}` | Obtenir progrés de l'estudiant | `api.ts` |
| POST | `/api/progress` | Guardar progrés d'una lliçó | `api.ts` |
| DELETE | `/api/progress/{studentId}/{courseId}` | Reiniciar progrés d'un curs | `api.ts` |
| POST | `/api/users/auth/login/` | Login usuari | `authService.ts` |
| POST | `/api/users/auth/logout/` | Logout usuari | `authService.ts` |
| GET | `/api/users/me/settings/` | Obtenir dades de l'usuari | `authService.ts` |
| GET | `/api/v1/courses/` | Llistat de cursos | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/` | Detalls d'un curs | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/topics/` | Lliçons d'un curs | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/students/` | Estudiants d'un curs | `courseService.ts` |
| POST | `/api/v1/courses/{slug}/topics/{topic}/problems/{problem}/submissions/` | Enviar solució | `courseService.ts` |

### APIs de Tercers / Llibreries

| API / Llibreria | Ús |
|----------------|-----|
| **react-router-dom** | Navegació SPA (Links, Routes, useNavigate, useParams, useLocation) |
| **i18next + react-i18next** | Traduccions (useTranslation, i18n.changeLanguage) |
| **framer-motion** | Animacions (motion.div, AnimatePresence, whileInView, whileHover) |
| **axios** | Peticions HTTP als endpoints del backend |
| **canvas-confetti** | Animació de confeti en completar lliçons |
| **MUI (Material UI v9)** | Sistema de components (ThemeProvider, CssBaseline, Box, Card, Button, etc.) |
| **localStorage API** | Persistència de: progrés, codi, punts, usuaris, tema, idioma, submissions, IDs eliminats |
| **Canvas API** | Fons interactiu de partícules (ParticlesBackground) |
| **window.dispatchEvent** | Comunicació entre components (auth-state-change, lessonProgressUpdated) |

---

## 7. Modes de la Lliçó (LessonPage.tsx)

| Mode | Descripció | Funcionalitat |
|------|------------|---------------|
| **Normal** | Mode estàndard | Edició lliure, +10 punts en completar |
| **Drill** | Temporitzador de 60s | Botó START, compte enrere, temps esgotat = fail |
| **Assist** | 3 pistes disponibles | Botó "Need help", mostra inici de la solució (primer 16 chars) |
| **Hackathon** | 150 punts extra | Punts addicionals sobre els 10 base |

---

## 8. Configuració del Build

```bash
npm install          # Instal·lar dependències
npm run dev          # Executar en desenvolupament (http://localhost:5173)
npm run build        # Construir per producció (tsc -b && vite build)
npm run preview      # Previsualitzar producció
```

### Vite Config destacada

| Opció | Valor |
|-------|-------|
| Path alias | `@` → `./src` |
| Sourcemaps | `true` (build) |
| reportCompressedSize | `true` |
| cssCodeSplit | `true` |
| manualChunks | `vendor` (react, react-dom, react-router-dom), `ui-library` (MUI, Emotion), `animations` (framer-motion) |
| watch.usePolling | `true` |
| optimizeDeps.include | MUI, Emotion, framer-motion, react-resizable-panels |
