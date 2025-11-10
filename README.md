Node 20

## Cambio de color del Login

Se actualizó la pantalla de inicio de sesión para usar el color amarillo corporativo en lugar del azul.

Detalles aplicados en `src/pages/Authentication/LoginCover.jsx`:
- Gradiente lateral: `linear-gradient(225deg,#5a3a00 0%, #e68e00 100%)`.
- Título: color `#e68e00`.
- Botón: fondo `#e68e00`, hover `#ff9f0a`, sombra acorde.
- Inputs: borde en focus `#e68e00` (incluye modo dark).

Nota: No se modificó la paleta global (`tailwind.config.js`); el cambio impacta únicamente el login.