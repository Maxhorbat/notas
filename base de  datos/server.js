// server.js — Backend para persistir notas en una base de datos SQLite real.
// Ejecutar: npm install && npm start
// Luego abrir notas-localstorage.html en el navegador (la app se conecta automáticamente).

const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ---- Base de datos ----
const db = new Database(path.join(__dirname, 'notas.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    time TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// ---- Rutas de la API ----

// Obtener todas las notas
app.get('/api/notes', (req, res) => {
  const rows = db.prepare('SELECT id, text, time FROM notes ORDER BY created_at ASC').all();
  res.json(rows);
});

// Crear una nota nueva
app.post('/api/notes', (req, res) => {
  const { id, text, time } = req.body;
  if (!id || !text) {
    return res.status(400).json({ error: 'id y text son campos requeridos' });
  }
  try {
    db.prepare('INSERT INTO notes (id, text, time) VALUES (?, ?, ?)').run(id, text, time || '');
    res.status(201).json({ id, text, time });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Eliminar una nota puntual
app.delete('/api/notes/:id', (req, res) => {
  db.prepare('DELETE FROM notes WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// Eliminar todas las notas
app.delete('/api/notes', (req, res) => {
  db.prepare('DELETE FROM notes').run();
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Servidor de notas escuchando en http://localhost:${PORT}`);
  console.log(`✓ Base de datos SQLite: ${path.join(__dirname, 'notas.db')}`);
});
