const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3010;

app.get('/', (req, res) => {
  res.send('Welcome to the Profile API');
});

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

let db;

function handleDisconnect() {
  db = mysql.createConnection(dbConfig);

  db.connect(err => {
    if (err) {
      console.error('Error connecting to database:', err);
      setTimeout(handleDisconnect, 2000); // Wait 2 seconds before trying to reconnect
    } else {
      console.log('Connected to database');
    }
  });

  db.on('error', err => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // Reconnect if the connection to the database is lost
    } else {
      throw err;
    }
  });
}

handleDisconnect();

app.get('/items', (req, res) => {
  db.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).send('Server Error');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`API server started at http://localhost:${port}`);
});
