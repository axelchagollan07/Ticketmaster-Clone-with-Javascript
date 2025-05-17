const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const conexion = require('../db');

// Registro
router.post('/registro', async (req, res) => {
  try {
    const { nombre, correo, usuario, contrasena } = req.body;

    if (!nombre || !correo || !usuario || !contrasena) {
      return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }

    conexion.query('SELECT * FROM usuarios WHERE email = ?', [correo], async (err, results) => {
      if (err) {
        console.error('Error al consultar correo existente:', err);
        return res.status(500).json({ mensaje: 'Error en el servidor' });
      }

      if (results.length > 0) {
        return res.status(409).json({ mensaje: 'El correo ya está registrado' });
      }

      try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const insertSql = 'INSERT INTO usuarios (nombre, email, usuario, password) VALUES (?, ?, ?, ?)';

        conexion.query(insertSql, [nombre, correo, usuario, hashedPassword], (err, result) => {
          if (err) {
            console.error('Error al insertar usuario:', err);
            return res.status(500).json({ mensaje: 'Error al registrar el usuario' });
          }
          res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
        });
      } catch (hashErr) {
        console.error('Error al hashear la contraseña:', hashErr);
        res.status(500).json({ mensaje: 'Error interno al procesar la contraseña' });
      }
    });
  } catch (error) {
    console.error('Excepción en /registro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Login
router.post('/login', (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
  }

  const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
  conexion.query(sql, [usuario], async (err, results) => {
    if (err) {
      console.error('Error al consultar usuario:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const user = results[0];
    const match = await bcrypt.compare(contrasena, user.password);

    if (!match) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    return res.status(200).json({ mensaje: 'Inicio de sesión exitoso', nombre: user.nombre });

  });
});

// Recuperación de contraseña
router.post('/recuperar', async (req, res) => {
  const { email, nuevaPass } = req.body;

  if (!email || !nuevaPass) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(nuevaPass, 10);

    const sql = 'UPDATE usuarios SET password = ? WHERE email = ?';
    conexion.query(sql, [hashedPassword, email], (err, resultado) => {
      if (err) {
        console.error('Error al actualizar contraseña:', err);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      if (resultado.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'No se encontró una cuenta con ese correo' });
      }

      res.json({ mensaje: 'Contraseña actualizada correctamente' });
    });
  } catch (err) {
    console.error('Error al hashear la nueva contraseña:', err);
    res.status(500).json({ mensaje: 'Error al procesar la contraseña' });
  }
});



module.exports = router;
