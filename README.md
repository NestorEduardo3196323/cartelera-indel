# CARTELERA INDEL

> Cartelera de eventos del instituto para toda la comunidad educativa: publicás un evento con fecha, hora y lugar, y cualquiera se entera sin depender del rumor.

## 1. Probala ahora
- **App publicada:** (pendiente — se agrega en M3)
- **Código QR:** (pendiente — evidencias/qr.png)
- **Usuario de prueba:** no requiere

## 2. Capturas
| Inicio | En uso | Con la IA trabajando |
|---|---|---|
| (pendiente) | (pendiente) | (pendiente) |

## 3. Qué hace
- Publicar un evento con fecha, hora, lugar y tipo de actividad.
- Filtrar los eventos por semana o por tipo de actividad.
- Mostrar un recordatorio del evento más próximo.

## 4. Cómo correrlo en tu máquina
```bash
git clone https://github.com/NestorEduardo3196323/cartelera-indel.git
cd cartelera-indel
npm install
# si usa API de IA (M5):
cp .env.example .env      # y escribí tu propia llave
npm run dev
