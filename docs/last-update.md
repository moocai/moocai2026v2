# Canvis realitzats - 18/06/2026

## src/components/Header.tsx
- Substituïts els botons d'idioma inline pel component `<LanguageSwitcher />` (tant desktop com mobile).
- Eliminada variable `currentLanguage` i `i18n` del destructure (només queda `t`).
- Reduït scroll timeout de 300ms a 100ms.
- Afegit `height: 40` al `commonButtonStyle` i al botó "My Progress".
- Afegit `boxShadow: '0 1px 20px #8400ff'` al AppBar.

## src/components/Hero.tsx
- Importat i usat `useThemeMode` per obtenir el mode actual.
- `<ParticlesBackground />` es renderitza **només** quan `mode === 'fancy'`.

## src/components/LanguageSwitcher.tsx
- Restilitzat completament: border `2px solid #8400ff`, `p: 0.3`, `fontWeight: 900`.
- Actiu amb `primary.main` sòlid (abans tenia opacitat 33%).
- `minWidth: 36px`, `py: 0`, `lineHeight: 1` per reduir altura.

## src/components/ThemeToggleButton.tsx
- Substituït l'antic toggle binari per un selector de 3 botons (Light / Dark / Fancy).
- Estil unificat amb LanguageSwitcher: border `2px solid #8400ff`, `borderRadius: 12px`.
- En mobile (`< md`): es mostra un sol botó que cicla entre els 3 temes.

## src/contexts/ThemeContext.tsx
- `ThemeMode` ara importat de `theme/theme.ts` (abans local com `'light' | 'dark'`).
- Ara suporta `'light' | 'dark' | 'fancy'`.
- `toggleTheme` cicla entre `['light', 'dark', 'fancy']`.
- `<ParticlesBackground />` renderitzat globalment al ThemeProvider **només** en mode fancy.

## src/data/exercises.ts
- **Fitxer eliminat** — les 19 definicions d'exercicis hardcoded ja no existeixen.
- Els exercicis ara es llegeixen des de l'API.

## src/i18n/ca.ts
- "inscriure's al curs" → "Veure temari del curs".
- "Home" → "Tornar a Home".
- "EXECUTAR" → "ENVIAR".

## src/i18n/en.ts
- "Subscribe Course" → "View course syllabus".
- "RUN" → "SEND".

## src/i18n/es.ts
- "inscribirse al curso" → "Ver temario del curso".
- "EJECUTAR" → "ENVIAR".

## src/pages/courses/CourseLessons.tsx
- Contingut de lliçons renderitzat com a **Markdown** (amb `react-markdown` + `remarkGfm`).
- Afegit estil extensiu per Markdown: `p`, `code`, `pre`, `ul/ol`, `h1-h6`, `table`, `a`, `blockquote`, `img`.
- Eliminat el bloqueig "PROPERAMENT" per cursos amb `disabled: true`.
- Títol de lliçó activa es mostra amb color **#8400ff**.
- Botons de subtopics actius amb color **#8400ff** (abans `#149eca`).
- En clicar al títol d'un temari (`AccordionSummary`), es marca com actiu i es desplega.

## src/pages/courses/LessonPage.tsx
- Canviat `submitChallenge()` per `courseService.submitSubmission(courseSlug, lessonId, code)`.
- Nous logs de consola: "📤 Enviat al servidor..." i "✅ Resposta rebuda del servidor".
- **Confetti després de `handleSaveProgress(true)`** completat al servidor (abans anava en paral·lel).
- `particleCount`: 30 → 80, `spread`: 50 → 70.
- Eliminat `requestAnimationFrame` que envoltava confetti + save.

## src/pages/dashboards/StudentDashboard.tsx
- Eliminada importació de `localExercises` (ja no existeix).
- `getCoursePoints` ja no filtra per exercicis locals — compta qualsevol lesson amb `dbProgress`.

## src/services/courseService.ts
- Nou mètode `submitSubmission(courseSlug, challengeSlug, code)` que fa POST a `/courses/{courseSlug}/challenges/{challengeSlug}/submissions/`.

## src/theme/theme.ts
- `ThemeMode` exportat i inclou `'fancy'` com a tercer mode.
- Nou palette `'fancy'`: mode dark amb `text.primary` i `text.secondary` a `#e4e4e4`.

## package.json
- Noves dependències: `react-markdown` (^10.1.0) i `remark-gfm` (^4.0.1).
