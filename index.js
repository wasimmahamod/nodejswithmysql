const express = require('express')
const app = express()
const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost', // Your database host
    user: 'root', // Your database username
    password: '', // Your database password
    database: 'node' // Your database name
});
app.use(express.json())
app.post('/', (req, res) => {
    let {
        name,
        email,
        password
    } = req.body;
    const newRecord = {
        name: name,
        email: email,
        password: password,
    };

    connection.query('INSERT INTO users SET ?', newRecord, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return;
        }
        console.log('Data inserted successfully:', results);
    });
})

const recordIdToDelete = 1; // Replace with the ID of the record you want to delete

connection.query('DELETE FROM users WHERE id = ?', [recordIdToDelete], (err, results) => {
    if (err) {
        console.error('Error deleting data:', err);
        return;
    }
    console.log('Data deleted successfully:', results);
});
// Establish the connection
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
        console.error('Error reading data:', err);
        return;
    }
    console.log('Data retrieved successfully:', results);
});


app.listen(8000, function () {
    console.log("server is running");
})