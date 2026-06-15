# MOOC React 2026
**Última actualització: 15 de juny de 2026**
---

## 1. Tecnologies i Dependències

| Categoria | Llibreria | Versió (package.json) | Ús |
|-----------|-----------|----------------------|-----|
| **Framework** | React | ^19.2.7 | Components i hooks |
| **Build** | Vite | ^6.0.0 | Dev server i bundling |
| **UI** | @mui/material | ^9.0.0 | Components Material Design + CssBaseline |
| **Estils** | @emotion/react, @emotion/styled | ^11.14.0 / ^11.14.1 | Estils CSS-in-JS |
| **Icons** | @mui/icons-material + lucide-react | ^9.0.0 / ^0.577.0 | Icones |
| **Routing** | react-router-dom | ^6.30.3 | Navegació SPA (v7 future flags) |
| **Animacions** | framer-motion + @react-spring/web | ^12.38.0 / ^10.1.0 | Animacions declaratives |
| **Internacionalització** | i18next + react-i18next + i18next-browser-languagedetector | ^26.0.6 / ^17.0.4 / ^8.2.1 | Multiidioma (CA, ES, EN) |
| **HTTP** | axios | ^1.15.0 | Peticions a API REST |
| **Confetti** | canvas-confetti | ^1.9.2 | Animació en completar lliçons |
| **React Compiler** | babel-plugin-react-compiler | ^1.0.0 | Optimització React 19 |
| **Util** | clsx, class-variance-authority | ^2.1.1 / ^0.7.1 | Classes condicionals |
| **Util** | tailwind-merge, tailwindcss-animate, tw-animate-css | ^3.5.0 / ^1.0.7 / ^1.4.0 | Utilitats Tailwind (instal·lades) |
| **Tipus** | TypeScript | ^5.5.0 | Tipat estàtic |
| **Dev** | @vitejs/plugin-react, postcss, autoprefixer, tailwindcss | ^4.3.0 / ^8.4.0 / ^10.4.0 / ^3.4.0 | Configuració build |

---

## 2. Estructura Completa del Projecte

```
src/
├── App.css                         # Estils CSS legacy (no importat des de cap fitxer)
├── App.tsx                         # Router principal amb rutes (Home, Courses, Dashboard)
├── env.d.ts                        # Declaracions de tipus per a fitxers estàtics (.css, .svg, .png, .webp)
├── i18n.ts                         # Configuració i18next principal (importat per I18nContext.tsx)
├── index.css                       # Scrollbar styling, CSS variables, animació shake
├── main.tsx                        # Punt d'entrada (BrowserRouter + StyledEngineProvider + ThemeProvider + I18nProvider + AuthProvider + NotificationProvider)
│
├── components/                     # Components reutilitzables
│   ├── CourseCard.tsx              # Targeta de curs (Home) amb motion animations
│   ├── Footer.tsx                  # Peu de pàgina multi-columna
│   ├── Header.tsx                  # Barra de navegació sticky amb menú mòbil overlay
│   ├── Hero.tsx                    # Secció hero amb typewriter + stats (lazy initializer) + ParticlesBackground
│   ├── LanguageSwitcher.tsx        # Canviador d'idioma (CA/ES/EN)
│   ├── ParticlesBackground.tsx     # Fons interactiu amb Canvas (partícules + connexió)
│   ├── ThemeToggleButton.tsx       # Botó mode clar/fosc (Sun/Moon icons)
│   └── ui/                         # Components base
│       ├── badge.tsx               # Badge (standard/outline) basat en MUI Chip
│       ├── Card.tsx                # Wrapper MUI Card amb blur, border, hover effects
│       ├── NotificationHub.tsx     # Toast UI: useTransition, useSpring, MUI Alert
│       ├── ProgressBar.tsx         # (BUIT)
│       └── SearchInput.tsx         # (BUIT)
│
├── contexts/                       # Contextos React
│   ├── AuthContext.tsx             # Autenticació (login/logout/token/user) - Provider connectat a main.tsx
│   ├── I18nContext.tsx             # Idioma (importa i18n des de src/i18n.ts, persistència localStorage clau mooc-language)
│   ├── NotificationContext.tsx     # Context + Provider (estat toasts, setTimeout, renderitza NotificationHub)
│   └── ThemeContext.tsx            # Tema clar/fosc (persistència localStorage clau mooc-theme-mode)
│
├── data/                           # Dades estàtiques
│   ├── courses.ts                  # 4 image mappings per als cursos (Python, React, Spring Boot, ML)
│   ├── exercises.ts                # 19 exercicis (13 Python, 2 React, 2 Spring Boot, 2 ML) amb initialCode + solution
│   └── students.ts                 # 3 estudiants predefinits (Marc/1, Jordi/2, Miquel/3)
│
├── features/                       # Components agrupats per funció
│   ├── student/
│   │   ├── CourseCard.tsx          # Card de curs al dashboard (expansible, progress icons, motion accordion)
│   │   ├── CourseExpandedContent.tsx # Contingut expandit (tabs syllabus/activities)
│   │   ├── CourseIcon.tsx          # Icona dinàmica Lucide per nom de curs
│   │   ├── Login.tsx               # Formulari login amb role toggle + create user + student grid
│   │   ├── ProgressOverview.tsx    # Barres LinearProgress per curs (hoverBg light/dark)
│   │   ├── RankingCard.tsx         # Rànquing amb Tabs per curs, usuari actiu destacat (hoverBg light/dark)
│   │   ├── ScrollIndicator.tsx     # Indicador scroll mòbil (chevrons animats)
│   │   ├── StudentCard.tsx         # Targeta login per PIN amb delete confirmation flow
│   │   ├── StudentProfileCard.tsx  # Perfil (avatar, nom, punts, logout, hoverBg light/dark)
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
│   ├── ca.ts                       # Català (auth, dashboard, home, hero, footer, course, lesson + 9 notifications)
│   ├── en.ts                       # Anglès
│   ├── es.ts                       # Castellà
│   └── index.ts                    # Configuració i18next duplicada (no importat des de cap lloc)
│
├── layouts/                        # Layouts per a rutes
│   ├── MainLayout.tsx              # Header + Outlet
│   └── TeacherLayout.tsx           # (BUIT)
│
├── pages/                          # Pàgines de l'aplicació
│   ├── Home.tsx                    # Landing: Hero, cursos (courseService), features animades, Footer
│   ├── courses/
│   │   ├── ${courseId}/
│   │   │   └── ${lesson.id}/
│   │   │       └── LessonTopic.tsx # Vista teòrica: sidebar lliçons + explicació + challenge
│   │   ├── CourseLessons.tsx       # 3 columnes: syllabus accordion (motion animat) + contingut + "On this page"
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
│   ├── api.ts                      # Client axios (progress CRUD híbrid local + API, BASE_URL: https://algorien.com/api)
│   ├── authService.ts              # Login/logout/getMe (només API, sense fallback local)
│   ├── courseService.ts            # CRUD cursos/lliçons amb 2 instàncies axios (publicApi + api auth)
│   └── teacherService.ts           # (BUIT)
│
├── theme/
│   └── theme.ts                    # getTheme(mode) per a MUI (primary #8400ff, secondary #ec4899)
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
| `vite.config.ts` | Configuració Vite + React plugin + `@` alias + proxy `/api` → `https://algorien.com` + manualChunks + sourcemap + babel-plugin-react-compiler |
| `tsconfig.json` | Configuració TypeScript amb `@/*` path alias |
| `package.json` | Dependències i scripts (dev, build, preview) |
| `.gitignore` | Fitxers ignorats per git |

### Public

| Fitxer | Propòsit |
|--------|----------|
| `public/img/favicon.png` | Favicon de l'aplicació |
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
| `main.tsx` | Renderitza `<App />` amb BrowserRouter (v7 future flags) + StyledEngineProvider + ThemeProvider + I18nProvider + AuthProvider + NotificationProvider | (completat) |
| `App.tsx` | Router: rutes `/` (Home), `/courses/:courseId` (CourseLessons), `/courses/:courseId/:lessonId` (LessonPage), `/dashboards/student` (StudentDashboard). MainLayout wrapper per courses i dashboard | (completat) |

### Components (`src/components/`)

| Fitxer | Exportacions | Funcions clau |
|--------|-------------|---------------|
| `Header.tsx` | `Header` | `scrollToDynamic(desktopPx, mobilePx)`, `handleLogout()`, `checkAuth()`, menú mòbil overlay amb AnimatePresence |
| `Hero.tsx` | `Hero (default)` | Typewriter animat (React, Python, SpringBoot, ML), stats dinàmiques (recompte estudiants via localStorage + event `studentsUpdated`), scroll chevrons |
| `Footer.tsx` | `Footer` | `FooterLink` (component intern), any dinàmic, 4 columnes (logo, explore, community, connect) |
| `CourseCard.tsx` | `CourseCard` | `handleEnroll()`, `getLocalizedText()`, disabled overlay "PROPERAMENT", motion animations |
| `ParticlesBackground.tsx` | `ParticlesBackground (default)` | Classe `Particle` amb `draw()` i `update()`, `connect()`, detecció dark/light mode |
| `ThemeToggleButton.tsx` | `ThemeToggleButton` | Alterna mode clar/fosc via `useThemeMode()` (Sun/Moon icons) |
| `LanguageSwitcher.tsx` | `LanguageSwitcher` | Canvia idioma via `i18n.changeLanguage()` |

### Components UI (`src/components/ui/`)

| Fitxer | Exportacions |
|--------|-------------|
| `Card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` (MUI wrappers amb blur i hover) |
| `badge.tsx` | `Badge` (mode `standard` / `outline`) basat en MUI Chip |
| `NotificationHub.tsx` | `NotificationHub` — Toast UI amb useTransition/useSpring, MUI Alert, tancament manual i auto |
| `ProgressBar.tsx` | (BUIT) |
| `SearchInput.tsx` | (BUIT) |

### Contexts (`src/contexts/`)

| Fitxer | Provider | Hook | Funcions |
|--------|----------|------|----------|
| `AuthContext.tsx` | `AuthProvider` | `useAuth()` | `login(credentials)`, `logout()`, estat: `user`, `token`, `isAuthenticated`, `loading` (Provider connectat a main.tsx) |
| `I18nContext.tsx` | `I18nProvider` | `useI18n()` | `setLanguage(lang)`, estat: `language` (persistit a localStorage clau `mooc-language`). Importa i18n des de `src/i18n.ts` per inicialitzar i18next |
| `NotificationContext.tsx` | `NotificationProvider` | `useNotifications()` | `addNotification(msg, severity)`. Estat intern `toasts`. Renderitza `<NotificationHub>` amb react-spring i auto-remove 2000ms |
| `ThemeContext.tsx` | `ThemeProvider` | `useThemeMode()` | `toggleTheme()`, `setMode(mode)`, estat: `mode` (persistit a localStorage clau `mooc-theme-mode`) |

### Dades Estàtiques (`src/data/`)

| Fitxer | Interfície | Contingut |
|--------|-----------|-----------|
| `courses.ts` | — | 4 image mappings (`python-public-test`, `React`, `springboot`, `MachineLearning`) |
| `exercises.ts` | `Exercise` | 19 exercicis (13 Python, 2 React, 2 Spring Boot, 2 ML) amb `initialCode`, `solution`, `challenge`, `exerciseInstructions` multiidioma |
| `students.ts` | `Student` | 3 estudiants predefinits amb PIN: Marc (1), Jordi (2), Miquel (3) |

### Features Student (`src/features/student/`)

| Fitxer | Exportació | Props / Funcions |
|--------|-----------|------------------|
| `types.ts` | `Student`, `Lesson`, `Topic`, `Course` | Interfícies compartides (Student amb role opcional) |
| `Login.tsx` | `Login` | Role toggle (student/teacher), create-user form (name, email, PIN), grid de StudentCards, rep `students` com a prop (fusionat al pare), gestió usuaris locals + IDs eliminats via localStorage |
| `CourseCard.tsx` | `CourseCard` | `onToggle`, `onResetCourse`, `onNavigate`, rep `course`, `isExpanded`, `dbProgress`, disabled overlay |
| `CourseExpandedContent.tsx` | `CourseExpandedContent` | Tabs syllabus/activities, llista lliçons amb icones (BookOpen/CheckCircle/PlayCircle), posicionament absolut (Box) |
| `CourseIcon.tsx` | `CourseIcon` | Retorna icona Lucide (Terminal, Globe, Cpu, Layers, Database, Code2) segons el nom del curs |
| `ProgressOverview.tsx` | `ProgressOverview` | Barres `LinearProgress` per curs amb percentatge (hoverBg light/dark) |
| `RankingCard.tsx` | `RankingCard` | Tabs per curs, llistat ordenat per progrés, usuari actiu destacat, icones Trophy (hoverBg light/dark) |
| `ScrollIndicator.tsx` | `ScrollIndicator` | 3 chevrons animats a cada costat (només mòbil) |
| `StudentCard.tsx` | `StudentCard` | Login per PIN, delete confirmation flow amb PIN (TextField + confirm/cancel), animació error shake |
| `StudentProfileCard.tsx` | `StudentProfileCard` | Avatar, nom, punts totals, botó logout, LinearProgress loading bar (hoverBg light/dark) |

### Features Teacher (`src/features/teacher/`)

TOTS ELS FITXERS estan BUITS (pendents d'implementar):
- `ChatWidget.tsx`, `CourseForm.tsx`, `ExerciseEditor.tsx`, `StatsCards.tsx`, `StudentFilters.tsx`, `StudentTable.tsx`

### Pàgines (`src/pages/`)

| Fitxer | Exportació | Funcions clau |
|--------|-----------|---------------|
| `Home.tsx` | (default) | Carrega cursos via `courseService.getAllCourses()` amb loading/error, 6 feature cards animades (containerVariants + cardVariants amb stagger i direccional), visibility change listener |
| `courses/CourseLessons.tsx` | (default) | Layout 3 columnes: syllabus accordion (motion.div amb slide-in seqüencial) + contingut (breadcrumb, course info, subTopics amb code examples) + "On this page" anchor links. Drawer mòbil per syllabus |
| `courses/LessonPage.tsx` | (default) | Editor codi interactiu. 4 modes (normal/drill/assist/hackathon), tests (cleanUser.includes(cleanSol)), confetti, submissions, localStorage progress. Desktop: 3 columnes (enunciat, editor, consola). Mobile: stack vertical amb flex column wrapper. Python: inline fail console panel a sota de l'editor (mobile + desktop), result modal només en passar (mostra "ALTRES ESTUDIANTS" + "Tornar"). Notificacions toast via `NotificationContext` en desar progrés |
| `courses/${courseId}/${lesson.id}/LessonTopic.tsx` | (default) | Sidebar llista lliçons (filtrada a l'actual), explicació teòrica, challenge box, exercise instructions, navegació prev/next/go-to-activity |
| `dashboards/StudentDashboard.tsx` | (default) | Login/create-user flow, profile card, progress overview, course grid expansible, ranking per tabs. Integra dades locals + API progress sync. Notificacions toast via `NotificationContext` (login, logout, create, delete, error PIN, reset curs). Dispara `studentsUpdated` event en crear/eliminar usuaris. Passa `students` com a prop a `Login` |
| `teacher/Courses.tsx` | (BUIT) | |
| `teacher/Dashboard.tsx` | (BUIT) | |
| `teacher/Exercises.tsx` | (BUIT) | |
| `teacher/Students.tsx` | (BUIT) | |

### Serveis (`src/services/`)

| Fitxer | Objecte | Mètodes | API Endpoints |
|--------|---------|---------|---------------|
| `api.ts` | `api` | `getStudentProgress(studentId)` (fusiona local + API), `postProgress(data)` (local + intent API), `resetCourse(studentId, courseId)` (local + API) | `GET /api/progress/{id}`, `POST /api/progress`, `DELETE /api/progress/{sid}/{cid}` |
| `authService.ts` | `authService` | `login(credentials)` (només API, sense fallback local), `logout()`, `getMe()` (API amb fallback localStorage), `getCurrentUser()` | `POST /api/users/auth/login/`, `POST /api/users/auth/logout/`, `GET /api/users/me/settings/` |
| `courseService.ts` | `courseService` | `getAllCourses()`, `getCourseBySlug(slug)`, `getCourseAvatar(slug)`, `getCourseTopics(slug)`, `getTopic(courseSlug, topicSlug)`, `getTopicProblems(courseSlug, topicSlug)`, `getProblem(...)`, `submitChallenge(...)`, `getCourseStudents(slug)`, `getFullCourseDetail(slug)` — usa 2 instàncies axios (publicApi + api amb token) | `GET /api/v1/public/courses/`, `GET /api/v1/courses/{slug}/`, `GET /api/v1/courses/{slug}/topics/`, `GET /api/v1/courses/{slug}/students/`, `POST /api/v1/courses/{slug}/topics/{t}/problems/{p}/submissions/` |
| `teacherService.ts` | (BUIT) | | |

### Theme (`src/theme/`)

| Fitxer | Exportacions | Colors |
|--------|-------------|--------|
| `theme.ts` | `getTheme(mode)` | **Dark**: primary `#8400ff` (porpra), secondary `#ec4899` (rosa), bg `#141414`; **Light**: primary `#8400ff`, secondary `#ec4899`, bg `white`. Font Inter, borderRadius 12px |

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

### Notificacions

- `NotificationContext.tsx`: Context amb `NotificationProvider` i hook `useNotifications()`.
- `NotificationHub.tsx` (`src/components/ui/NotificationHub.tsx`): Component UI separat que renderitza toasts amb:
  - `useTransition` de react-spring per animació d'entrada/sortida (`translateX(100%)`)
  - Barra de progrés animada amb `useSpring` (2000ms, gradient `#8400ff`)
  - `Alert` de MUI amb `variant="filled"`
  - Colors adaptatius al mode: **Dark** → `bgcolor="#141414"`, text/icona `white`; **Light** → `bgcolor="white"`, text/icona `#141414`
  - Botó de tancar amb `lucide-react X`
- Durada de 2000ms amb neteja automàtica via `setTimeout` i tancament manual
- Les notificacions estan traduïdes als 3 idiomes amb clau `notifications.*` (9 claus: progress_saved, progress_error, account_created, user_deleted, incorrect_pin, welcome, session_closed, course_reset, course_reset_error)
- Usen interpolació d'i18next (`{{name}}`, `{{role}}`) per a missatges dinàmics

### Traduccions (`src/i18n/`)

| Fitxer | Seccions |
|--------|----------|
| `ca.ts` (130 línies) | auth, dashboard, home, hero, footer, course, common, **notifications (9 claus)**, lesson (syllabus, run, debug, objective, challenge, points, etc.) |
| `es.ts` (136 línies) | Mateixes seccions en castellà |
| `en.ts` (132 línies) | Mateixes seccions en anglès |
| `index.ts` (24 línies) | Configuració i18next duplicada (no importada des de cap lloc). La configuració real es carrega des de `src/i18n.ts`, importada per `I18nContext.tsx` |

---

## 4. Flux de Dades Actual

### Fonts de Dades

1. **`src/data/`** - Image mappings per cursos (courses.ts), exercicis (exercises.ts 19 items), estudiants predefinits (students.ts 3 items)
2. **API REST** - `API ISAAC` (amb proxy Vite `/api` → `https://algorien.com`). `courseService.ts` usa 2 instàncies axios: `publicApi` (sense auth) per cursos públics, `api` (amb Token header) per endpoints autenticats
3. **localStorage** - Claus:
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
- ✅ Components UI (Header amb menú mòbil, Hero amb typewriter + stats dinàmiques via event `studentsUpdated`, Footer, CourseCard amb motion, ParticlesBackground)
- ✅ Context d'idioma (I18nProvider) + suport multiidioma (CA/ES/EN) - Provider connectat a main.tsx
- ✅ Context de tema (ThemeContext) + mode clar/fosc (persistit a localStorage)
- ✅ Context de notificacions (NotificationContext) + toast notifications amb colors adaptatius dark/light
- ✅ Context d'autenticació (AuthContext) - Provider connectat a main.tsx
- ✅ StudentDashboard complet (login/create-user, perfil, progrés, rànquing, cursos expansibles)
- ✅ CourseLessons (layout 3 columnes amb syllabus accordion animat + contingut + anchor links, drawer mòbil)
- ✅ LessonPage (editor codi amb 4 modes, tests per inclusió, confetti, submissions, localStorage, inline Python fail console panel, result modal només en passar)
- ✅ LessonTopic (vista teòrica amb sidebar lliçons + explicació + challenge + navegació)
- ✅ Serveis API amb fallback local (api.ts) o sense (authService.ts). courseService.ts amb 2 instàncies axios (publicApi + api auth)
- ✅ Dades estàtiques completes (exercises.ts 19 exercicis, students.ts 3 usuaris, course image mappings)
- ✅ Utils (formatters, validators, sx compositor)
- ✅ `main.tsx` i `App.tsx` - Connectats amb BrowserRouter (v7 flags), StyledEngineProvider, ThemeProvider, I18nProvider, AuthProvider, NotificationProvider
- ✅ `MainLayout.tsx` - En ús com a layout route (Header + Outlet)
- ✅ `vite.config.ts` - Configurat amb `@` alias, proxy `/api` → `https://algorien.com`, manualChunks, sourcemap, babel-plugin-react-compiler
- ✅ Theme personalitzat (colors porpra #8400ff / rosa #ec4899) a `theme.ts`
- ✅ Gestió d'estudiants locals (crear, eliminar, persistència)
- ✅ Home features animades amb containerVariants + cardVariants (stagger, direccional)
- ✅ CourseLessons sidebar accordions amb motion slide-in seqüencial
- ✅ Adaptació hoverBg a StudentProfileCard, ProgressOverview, RankingCard per mode light/dark
- ✅ `NotificationHub.tsx` amb colors adaptatius: **Dark** bg `#141414`, text/icona `white`; **Light** bg `white`, text/icona `#141414`
- ✅ `index.css` amb scrollbar personalitzada: track `#f5f5f5` (light) / `#0a0a0a` (dark), thumb `#8400ff`

### Per Implementar
- ❌ Pàgines de teacher (Courses, Dashboard, Exercises, Students)
- ❌ Components de teacher (ChatWidget, CourseForm, ExerciseEditor, StatsCards, StudentFilters, StudentTable)
- ❌ `ProgressBar.tsx`, `SearchInput.tsx`
- ❌ `useTeacherData.ts`, `teacherService.ts`, `TeacherLayout.tsx`

### Observacions
- `AuthContext` connectat a main.tsx, però StudentDashboard i Header encara fan servir localStorage directament (no usen `useAuth()`)
- `authService.login()` NO té fallback local (només API, llança error si no disponible); `getMe()` sí té fallback a localStorage
- `courseService.ts` usa 2 instàncies axios: `publicApi` (baseURL `/api/v1/public/courses/`, sense auth) i `api` (baseURL `/api/v1/courses/`, amb Token header). NO té fallback a `data/courses.ts`
- `api.ts` té un sistema híbrid (localStorage + API) per al progrés, amb BASE_URL apuntant a `https://algorien.com/api`
- `main.tsx` ara inclou tots els providers: BrowserRouter + StyledEngineProvider + ThemeProvider + I18nProvider + AuthProvider + NotificationProvider
- `src/i18n.ts` (arrel) és importat per `I18nContext.tsx` per inicialitzar i18next. Existeix un duplicat a `src/i18n/index.ts` que no s'importa des de cap lloc (deixat de la migració)
- `src/App.css` existeix però no és importat des de cap fitxer (estils legacy no utilitzats)
- Tots els components de StudentDashboard estan desacoblats a `features/student/`
- El projecte utilitza Vite 6 amb `@` path alias
- `ThemeContext`, `I18nContext`, `AuthContext` i `NotificationContext` usen `use(Context)` de React 19 en lloc de `useContext(Context)`
- `babel-plugin-react-compiler` està configurat a `vite.config.ts` amb `target: "19"`
- `NotificationContext.tsx` i `NotificationHub.tsx` gestionen les toast notifications amb animacions react-spring, MUI Alert, i auto-remove 2000ms. Colors adaptatius al mode dark/light
- Inconsistència de color de fons: MUI theme usa `#141414` en mode fosc, ParticlesBackground usa `#0a0a0a`, scrollbar usa `#0a0a0a` en dark
- S'ha afegit `"react-is": "19.0.0"` com a override a `package.json` per compatibilitat MUI v9
- `Hero.tsx` ara mostra recompte d'estudiants dinàmic (escolta event `studentsUpdated`), en lloc d'un valor estàtic
- `Login.tsx` ja no gestiona internament la fusió d'estudiants — rep `students` com a prop des de `StudentDashboard`
- `StudentDashboard.tsx` dispara `studentsUpdated` en crear/eliminar usuaris per mantenir sincronitzat el Hero
- S'ha integrat `NotificationContext` a `LessonPage.tsx` i `StudentDashboard.tsx` per feedback visual d'usuari
- Les notificacions del context ara estan traduïdes als 3 idiomes via `t('notifications.*')` amb interpolació
- `LessonTopic.tsx` fa referència a `localCourses` que no està definit al fitxer (potencial bug)
- `courseService.ts` té implementació completa amb `getFullCourseDetail()` que combina course + topics + problems en una sola crida

---

## 6. APIs Utilitzades

### API REST (Backend esperat a `API ISAAC` — proxy Vite: `/api` → `https://algorien.com`)

| Mètode | Endpoint | Ús | Servei |
|--------|----------|-----|--------|
| GET | `/api/progress/{studentId}` | Obtenir progrés de l'estudiant | `api.ts` |
| POST | `/api/progress` | Guardar progrés d'una lliçó | `api.ts` |
| DELETE | `/api/progress/{studentId}/{courseId}` | Reiniciar progrés d'un curs | `api.ts` |
| POST | `/api/users/auth/login/` | Login usuari | `authService.ts` |
| POST | `/api/users/auth/logout/` | Logout usuari | `authService.ts` |
| GET | `/api/users/me/settings/` | Obtenir dades de l'usuari | `authService.ts` |
| GET | `/api/v1/public/courses/` | Llistat públic de cursos | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/` | Detalls d'un curs | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/avatar/` | Avatar d'un curs | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/topics/` | Lliçons d'un curs | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/topics/{topic}/` | Detall d'un tema | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/topics/{topic}/problems/` | Problemes d'un tema | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/topics/{topic}/problems/{problem}/` | Detall d'un problema | `courseService.ts` |
| POST | `/api/v1/courses/{slug}/topics/{topic}/problems/{problem}/submissions/` | Enviar solució | `courseService.ts` |
| GET | `/api/v1/courses/{slug}/students/` | Estudiants d'un curs | `courseService.ts` |

### APIs de Tercers / Llibreries

| API / Llibreria | Ús |
|----------------|-----|
| **react-router-dom** | Navegació SPA (Links, Routes, useNavigate, useParams, useLocation) |
| **i18next + react-i18next** | Traduccions (useTranslation, i18n.changeLanguage) |
| **framer-motion + @react-spring/web** | Animacions (motion.div, AnimatePresence, whileInView, whileHover, spring) |
| **axios** | Peticions HTTP als endpoints del backend |
| **canvas-confetti** | Animació de confeti en completar lliçons |
| **MUI (Material UI v9)** | Sistema de components (ThemeProvider, CssBaseline, Box, Card, Button, Accordion, etc.) |
| **localStorage API** | Persistència de: progrés, codi, punts, usuaris, tema, idioma, submissions, IDs eliminats |
| **Canvas API** | Fons interactiu de partícules (ParticlesBackground) |
| **window.dispatchEvent** | Comunicació entre components (auth-state-change, lessonProgressUpdated, studentsUpdated) |
| **NotificationContext** | Toast notifications (LessonPage, StudentDashboard) |
| **babel-plugin-react-compiler** | Optimització React 19 a nivell compilador |

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
| Proxy | `/api` → `https://algorien.com` (dev server) |
| Sourcemaps | `true` (build) |
| reportCompressedSize | `true` |
| cssCodeSplit | `true` |
| manualChunks | `vendor` (react, react-dom, react-router-dom), `ui-library` (MUI, Emotion), `animations` (framer-motion) |
| Server port | `5173` |
| watch.usePolling | `true` |
| optimizeDeps.include | @mui/material, @mui/material/styles, @emotion/react, @emotion/styled, framer-motion |
| babel-plugin-react-compiler | `{ target: "19" }` |
