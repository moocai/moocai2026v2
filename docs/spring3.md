Proposta Sprint 3 Miquel
- ✅ Enunciat exercici en el text itinerari abans dapretar Començar exercici (com React.dev) FET
- ✅ Table of contentes amagada per definició → més net
- ✅ Login / registre canviar nom PIN → Contrassenya
- ✅ Navegació Usuari → Al triar Curs clicable directament sense sub-menú (extra:amb 2 buttons)
- ⏺ Sub-menú possible: llista d’exercicis (component reutilitzat Jordi?)
- ✅ Botó canviar nom a exercici, no challenge
- ✅ Exercici guardar progrés automàticament abans de tancar i sense botó (Isaac)
- Editar codi / Executar / Temporitzador des que l’user comença a escriure codi i cada 10s? On es guarda? Local navegador…?
- ✅ Exercici feedback → donar botó tornar a teoria FLOW
- ✅ Tornar de exercici a Itinerari amb botó enrere guardar lloc on estaves de secció i de scroll, 
- ✅ Tornar de exercici completat amb exit a itinerari passar a seguent secció (convertir botó existent ‘seguent’ al botó figma Miquel)
- Miquel s’ofereix a programar / investigar render React o Sandbox

---
## Revisió 11/06/2026
- ✅ 1. Enunciat exercici en el text itinerari — **FET** (CourseLessons.tsx: exercise explanation box)
- ✅ 2. TOC amagada per defecte — **FET** (CourseLessons.tsx: showRightPanel false per defecte)
- ✅ 3. PIN → Contrassenya — **FET** (StudentCard.tsx: t('dashboard.pin_label'))
- ✅ 4. Navegació curs clicable directe — **FET** (CourseCard.tsx: Temari button + Laboratoris button)
- ❌ 5. Sub-menú llista exercicis — **NO FET** (pendent de decidir component)
- ✅ 6. Botó "Anar a l'activitat" — **FET** (CourseLessons.tsx: t('lesson.go_to_activity'))
- ✅ 8. Auto-save sense botó — **FET** (LessonPage.tsx: auto-save 10s, Save buttons eliminats)
- ⏺ 8. Timer en escriure codi + cada 10s — **MIG** (auto-save 10s funciona; timer des que l'usuari escriu NO)
- ✅ 9. Tornar a teoria — **FET** (LessonPage.tsx: handlePrevious → /courses/:courseId)
- ✅ 10. Guardar scroll i secció — **FET** (CourseLessons.tsx: sessionStorage scroll + ?lessonId= query param)
- ✅ 11. Passar a següent secció — **FET** (LessonPage.tsx: handleNext → ?lessonId=nextId)
- ❌ 12. Miquel sandbox / render React — **NO FET**
