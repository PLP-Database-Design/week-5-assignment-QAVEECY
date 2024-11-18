const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567890',
    database: 'hospital_db',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

// API endpoint to get users
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/patients', (req, res) =>
    { const sql = 'SELECT * FROM patients';
        db.query(sql, (err, results) =>
            { if (err) { res.status(500).send(err.message); return; }
        res.json(results); }); });


app.get('/providers', (req, res) =>
    { const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(sql, (err, results) =>
    { if (err) { res.status(500).send(err.message); return; }
    res.json(results); }); });

app.get('/patientsfirstname', (req, res) =>
    { const sql = 'SELECT first_name FROM patients';
    db.query(sql, (err, results) =>
    { if (err) { res.status(500).send(err.message); return; }
    res.json(results); }); });

app.get('/providersspecialty', (req, res) =>
    { const sql = 'SELECT provider_specialty FROM providers';
    db.query(sql, (err, results) =>
    { if (err) { res.status(500).send(err.message); return; }
    res.json(results); }); });

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



