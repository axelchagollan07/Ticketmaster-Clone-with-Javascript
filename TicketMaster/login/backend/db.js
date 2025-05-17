const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'PUT HERE YOUR SQL USER',
  password: 'PUT HERE YOUR SQL PASSWORD',
  database: 'ticketmaster'
});

conexion.connect((err) => {
  if (err) {
    console.error('Error de conexión: ', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

module.exports = conexion;
