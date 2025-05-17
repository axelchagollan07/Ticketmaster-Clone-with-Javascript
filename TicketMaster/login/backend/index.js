const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth'); // Ajusta esta ruta según la ubicación real de tu archivo auth.js

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a tu base de datos MySQL (ajusta los datos a tu configuración)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Emm4nu3l2016$',
  database: 'ticketmaster'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Montar rutas de autenticación
app.use('/auth', authRoutes);

// Ruta para guardar la compra
app.post('/api/guardar-compra', (req, res) => {
  const { nombre, evento, fecha, lugar, cantidad, metodoPago, total, codigos } = req.body;

  const compraSQL = `INSERT INTO compras (nombre, evento, fecha, lugar, cantidad, metodo_pago, total) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(compraSQL, [nombre, evento, fecha, lugar, cantidad, metodoPago, total], (err, result) => {
    if (err) {
      console.error('Error al guardar la compra:', err);
      return res.status(500).json({ error: 'Error al guardar la compra' });
    }

    const compraId = result.insertId;

    // Guardar códigos de boletos asociados a la compra
    const codigosSQL = `INSERT INTO boletos (compra_id, codigo) VALUES ?`;
    const valores = codigos.map(c => [compraId, c]);

    db.query(codigosSQL, [valores], (err2) => {
      if (err2) {
        console.error('Error al guardar los códigos:', err2);
        return res.status(500).json({ error: 'Compra guardada, pero error al guardar códigos' });
      }

      res.json({ mensaje: 'Compra guardada exitosamente', compraId });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
