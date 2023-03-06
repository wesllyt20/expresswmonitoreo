const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'wmonitoreo',
});

connection.connect((error) => {
  if (error) {
    console.error('Error de conexión: ', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Endpoint para autenticar un usuario
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM usuarios WHERE username = ? AND password = ?`;
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error en la consulta: ', error);
      res.status(500).json({ error: 'Error en la consulta' });
    } else {
      if (results.length === 1) {
        // Si el usuario y contraseña son correctos, genera un token JWT
        const token = jwt.sign({ username }, 'secreto');
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Credenciales inválidas' });
      }
    }
  });
});
app.get('/usuarios', function(req, res) {
  connection.query('SELECT * FROM usuarios', function(err, results, fields) {
    if (err) throw err;
    res.send(results);
  });
});
// Endpoint protegido que requiere un token JWT válido
app.get('/perfil', (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ error: 'Se requiere token de autenticación' });
    return;
  }
  try {
    // Verifica y decodifica el token JWT
    const decoded = jwt.verify(token, 'secreto');
    const { username } = decoded;
    const query = `SELECT * FROM usuarios WHERE username = ?`;
    connection.query(query, [username], (error, results) => {
      if (error) {
        console.error('Error en la consulta: ', error);
        res.status(500).json({ error: 'Error en la consulta' });
      } else {
        if (results.length === 1) {
          const { id, nombre, email } = results[0];
          res.json({ id, username, nombre, email });
        } else {
          res.status(404).json({ error: 'Usuario no encontrado' });
        }
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
