const express = require("express");
const cors = require("cors")
const app = express();
require('dotenv').config({ path: '.env' });
const mysql = require('mysql2');

app.use(cors());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`MySQL is connected at ${process.env.DB_HOST}`);
    
})

// RESTAPI SECTION (GET, POST, PUT)
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT} at ${new Date()}`);
});

app.get('/api', async (res, req) => {
    req.send({
        message: "Hello World"
    })
    console.log("GET");
});

app.get('/api/get', async (res, req) => {
    connection.query(`SELECT * FROM test`, (err, result) => {
        if (err) throw err;
        console.log("GET from MySQL")
        req.status(200).send(result)
    });
    // INSERT INTO ${table_name} VALUES (${value1}, ${value2}, ...)
    
});

// TESTING

const url = 'https://api.openf1.org/v1/car_data?driver_number=55&session_key=9159&speed>=315'

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    // ACCESSING THE ATTRIBUTE OF THE FIRST DATA
    console.log(data[0].brake);
}