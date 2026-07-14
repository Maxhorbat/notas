# Notas — localStorage + Base de datos

Esta carpeta tiene dos partes:

- **`notas-localstorage.html`** — la página de notas. Funciona sola (usando solo `localStorage`) o conectada al servidor (usando SQLite como base de datos real).
- **`server.js`** — un backend con Express que expone una API REST y guarda las notas en `notas.db` (SQLite).

## Cómo activar la base de datos

1. Abre una terminal en esta carpeta.
2. Instala las dependencias:
   ```
   npm install
   ```
3. Levanta el servidor:
   ```
   npm start
   ```
   Verás:
   ```
   ✓ Servidor de notas escuchando en http://localhost:3000
   ✓ Base de datos SQLite: .../notas.db
   ```
4. Abre `notas-localstorage.html` en tu navegador (doble clic, o arrástralo a una pestaña).

La página detecta automáticamente si el servidor está corriendo:

- 🟢 **Conectado a la base de datos** — cada nota que agregues o borres se guarda en `notas.db` a través de la API. `localStorage` solo actúa como caché para que la página cargue al instante.
- 🟡 **Modo local** — si el servidor no está corriendo (o lo cierras), la app sigue funcionando guardando únicamente en `localStorage`, sin perder funcionalidad.

## Endpoints de la API

| Método | Ruta               | Qué hace                        |
|--------|---------------------|----------------------------------|
| GET    | `/api/notes`         | Devuelve todas las notas         |
| POST   | `/api/notes`         | Crea una nota `{id, text, time}` |
| DELETE | `/api/notes/:id`     | Elimina una nota puntual         |
| DELETE | `/api/notes`         | Elimina todas las notas          |

## Notas técnicas

- La base de datos es un archivo `notas.db` que se crea solo en la primera ejecución — no necesitas instalar ningún motor de base de datos aparte.
- Si quieres usar otra base de datos (MySQL, PostgreSQL, MongoDB), solo hay que cambiar la sección de `server.js` que habla con la base de datos; las rutas de la API y el HTML no necesitan cambios.
