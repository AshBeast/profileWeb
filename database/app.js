// app.js

const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3010;

const db = mysql.createConnection({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'mydatabase'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.get('/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
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
