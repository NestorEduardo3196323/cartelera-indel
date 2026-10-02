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
CONTEXTO: Seguimos sobre la MISMA app, CARTELERA INDEL, cartelera de eventos de la comunidad educativa. Ya tiene P0, M1 y M2: publicar evento (título, fecha, hora, lugar, tipo), filtrar por semana o tipo, recordatorio del evento más próximo y persistencia en localStorage.

TAREA (M3): Ajustá la interfaz para celular SIN cambiar la lógica. Requisitos:
1. Se usa bien desde 320 px de ancho, con una sola mano y sin hacer zoom.
2. Contraste suficiente para leer al sol; texto nunca menor a 16 px.
3. Todos los campos del formulario con etiqueta visible (fecha, hora, lugar, tipo), no solo placeholder.
4. Un solo botón principal por pantalla (ej: "Publicar evento"); los demás, secundarios.
5. Estado vacío: qué se muestra cuando NO hay ningún evento cargado, con una frase que invite a publicar el primero.
6. Mensajes de éxito y error visibles, en español, sin palabras técnicas.

Dame solo los cambios (archivo y lugar) y decime cuál de los 6 puntos NO pudiste cumplir y por qué.

NO TE ADELANTES: nada de validaciones de robustez (M4) ni IA (M5).

## M4 · Robustez
(pendiente)

## M5 · Inteligencia
(pendiente)

## Cierre
- Prompts que escribí en total: …
- El prompt que más me sirvió y por qué: …
- El error más caro que cometí: …
- Lo que haría distinto la próxima vez: …


