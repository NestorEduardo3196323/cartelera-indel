# Bitácora de prompts — CARTELERA INDEL

## P0 · Prompt cero
**Prompt textual:**

ROL: Sos un desarrollador senior de aplicaciones web.
CONTEXTO: Estoy construyendo una app llamada CARTELERA INDEL para toda la comunidad educativa del instituto (estudiantes, docentes y personal). El problema que resuelve es: de las actividades del instituto uno se entera por rumor.
TAREA: Generá la PRIMERA versión funcional de la app, con estas tres funciones y nada más:
Publicar un evento con: título, fecha, hora, lugar y tipo de actividad.
Filtrar la lista de eventos por semana o por tipo de actividad.
Mostrar un recordatorio del evento más próximo (el siguiente evento futuro según fecha y hora).
RESTRICCIONES: todo en español, sin librerías de pago, sin login, sin base de datos en servidor todavía, sin ninguna función de inteligencia artificial por ahora. Que se vea bien en un celular. Código comentado donde alguien se pueda equivocar.
FORMATO DE SALIDA: los archivos completos, cada uno con su nombre, y al final una lista de lo que NO hiciste y por qué.
CRITERIO DE ACEPTACIÓN: abro la app, publico un evento con fecha, hora y lugar, lo veo en la lista y veo señalado el evento más próximo, sin errores en consola
**Qué devolvió:** la primera versión de CARTELERA INDEL con las tres funciones (publicar evento, filtrar por semana/tipo y recordatorio del evento más próximo).
**Qué acepté:** la app completa generada.
**Qué corregí a mano:** nada por ahora.
**Evidencia:** evidencias/E0-inicial.png
**Commit:** P0: primera version generada con IA

## M1 · Función
**Prompt textual:** No se usó un prompt nuevo en esta etapa. Las tres funciones mínimas (publicar evento, filtrar por semana/tipo y recordatorio del evento más próximo) salieron completas desde la generación inicial de P0.

**Qué hice en M1:** Verifiqué las tres funciones una por una, a mano:
1. Publicar un evento con título, fecha, hora, lugar y tipo: funciona, el evento aparece en la lista.
2. Filtrar por semana (Esta semana / Próxima semana) y por tipo de actividad: funciona.
3. Recordatorio del evento más próximo: se muestra y se actualiza correctamente.

**Resultado:** Las tres funciones quedaron confirmadas y funcionando.
**Evidencia:** evidencias/E1-antes.png, evidencias/E1-despues.png, evidencias/E1.0-despues.png
**Commit:** M1: verificacion de las tres funciones minimas

## M2 · Datos
**Prompt textual:**
**Qué devolvió:** la app ahora guarda los eventos en localStorage; sobreviven al cerrar y reabrir. Se guardan eventos publicados y pasados.
**Qué acepté:** el código de guardar, leer y borrar con localStorage.
**Qué corregí a mano:** (lo que hayas tocado, o "nada")
**Evidencia:** evidencias/E2-antes.png, evidencias/E2-despues.png, evidencias/E2.0-despues.png
**Commit:** M2: persistencia de datos

## M3 · Experiencia
(pendiente)

## M4 · Robustez
(pendiente)

## M5 · Inteligencia
(pendiente)

## Cierre
- Prompts que escribí en total: …
- El prompt que más me sirvió y por qué: …
- El error más caro que cometí: …
- Lo que haría distinto la próxima vez: …


