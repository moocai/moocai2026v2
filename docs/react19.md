# Auditoria i Modernització React 19

## Resum

Migració completa del projecte a patrons React 19. S'han eliminat anti-patrons heredats de React 17/18 i redundàncies, sense alterar l'estil visual ni la lògica de negoci. **Build: 0 errors.**

---

## Canvis realitzats

### 1. `useContext` → `use()` (2 fitxers)
**Fitxers**: `src/contexts/ThemeContext.tsx`, `I18nContext.tsx`

- **`import { useContext, ... }`** → **`import { use, ... }`**
- **`useContext(AuthContext)`** → **`use(AuthContext)`**
- **Motiu**: React 19 recomana `use(Context)` en lloc de `useContext(Context)` per llegir valors de context.

### 2. `useEffect` per persistència → eliminat (1 fitxer)
**Fitxer**: `src/contexts/ThemeContext.tsx`

- **Eliminat `useEffect`** que persistia `mode` a localStorage
- **`I18nContext.tsx`**: Manté un `useEffect` per sincronitzar localStorage amb i18n (necessari perquè i18n pot canviar externament)
- **Motiu**: `setMode()` ja crida `localStorage.setItem()`. L'effect era redundant i afegia un cicle de render extra.

### 3. `useEffect` amb dades estàtiques → lazy initializer (1 fitxer)
**Fitxer**: `src/components/Hero.tsx`

- **`useEffect`** que carregava dades d'imports estàtics → **`useState(() => {...})`** amb lazy initializer
- **Motiu**: Les dades són síncrones (imports estàtics). El lazy initializer evita un render extra i un `useEffect` innecessari.

### 4. `React.FormEvent`/`React.MouseEvent` → tipus directes (5 fitxers)
**Fitxers**: `Login.tsx`, `StudentDashboard.tsx`, `features/student/CourseCard.tsx`, `features/student/StudentCard.tsx`, `components/CourseCard.tsx`

- **`React.FormEvent`** → **`FormEvent`** (importat de `react`)
- **`React.MouseEvent`** → **`MouseEvent`** (importat de `react`)
- **Motiu**: React 19 amb JSX transform automàtic no necessita `import React`.

### 5. `App.tsx` — `useEffect` per body background eliminat
- Eliminat `useEffect` que feia `document.body.style.backgroundColor = theme.palette.background.default`
- El fons es gestiona directament al JSX (`<Box sx={{bgcolor: 'background.default'}}>`)

### 6. `main.tsx` — imports nets
- **`import React from 'react'`** → **`import { StrictMode } from 'react'`**
- **`ReactDOM.createRoot`** → **`createRoot`**
- **`<React.StrictMode>`** → **`<StrictMode>`**

### 7. `Header.tsx` — estat `mounted` eliminat
- Eliminat patró `mounted` necessari per SSR/hidratació. En app Vite client-side, `mounted` és `true` des del primer render.

### 8. `Footer.tsx` — `import React` → `import type { ReactNode }`
- `import type` no impacta al bundle.

### 9. `LessonPage.tsx` — `useRef` tipus simplificat
- **`useRef<NodeJS.Timeout | null>(null)`** → **`useRef<ReturnType<typeof setInterval>>(null)`**

### 10. `Login.tsx` — `useEffect` + `useState` → lazy initializer
- Lectura de localStorage síncrona amb lazy initializer.

### 11. `LessonPage.tsx` — estat `mounted` eliminat
- `baseLesson` ja fa de guard.

---

## Patrons no detectats (ja nets)

| Patró | Estat |
|-------|-------|
| `forwardRef` | ❌ No s'usa |
| `PropTypes` / `propTypes` | ❌ No s'usa |
| `defaultProps` | ❌ No s'usa |
| Class components | ❌ Tots function components |
| `findDOMNode` | ❌ No s'usa |
| `React.FC` / `FunctionComponent` | ❌ No s'usa |

---

## Arxius buits detectats (pendents d'implementar)

```
src/hooks/useTeacherData.ts
src/layouts/TeacherLayout.tsx
src/features/teacher/ChatWidget.tsx
src/features/teacher/CourseForm.tsx
src/features/teacher/ExerciseEditor.tsx
src/features/teacher/StatsCards.tsx
src/features/teacher/StudentFilters.tsx
src/features/teacher/StudentTable.tsx
src/pages/teacher/Dashboard.tsx
src/pages/teacher/Courses.tsx
src/pages/teacher/Exercises.tsx
src/pages/teacher/Students.tsx
src/components/ui/ProgressBar.tsx
src/components/ui/SearchInput.tsx
src/services/teacherService.ts
```

---

## Fitxers que NO cal migrar

| Directori | Motiu |
|-----------|-------|
| `src/services/` | Axios + lògica, no React |
| `src/utils/` | Funcions pures, no React |
| `src/data/` | Dades estàtiques, no React |
| `src/types/` | Types només, no React |
| `src/theme/` | MUI pur, no React |
| `src/i18n/` | i18next, no React |
| `src/middleware/` | Buit |
| `public/` | Estàtics |
| `dist/` | Build output |

---

## Fitxers de configuració (ja React 19)

| Fitxer | Estat |
|--------|-------|
| `package.json` | ✅ `react@^19.2.7`, `@types/react@^19.2.16` |
| `tsconfig.json` | ✅ `"jsx": "react-jsx"` |
| `vite.config.ts` | ✅ `babel-plugin-react-compiler` amb `target: "19"` |
| `index.html` | ✅ HTML genèric |

---

## Dependències del projecte

```json
"react": "^19.2.7"
"react-dom": "^19.2.7"
"@types/react": "^19.2.16"
"@types/react-dom": "^19.2.3"
```
