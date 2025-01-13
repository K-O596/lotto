const express = require('express')  //require values
const mysql = require('mysql');

const app = express()
const port = 3000

const con = mysql.createConnection({    //password and something
    host: 'localhost',
    user: 'root',
    password: 'groupa',
    database: 'express_db'
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

con.connect(function(err) { //check connecting to mysql
    if (err) throw err;
    console.log('Connected');
    const sql = "select * from numbers"
    con.query(sql, function (err, result, fields) {  
    if (err) throw err;
    console.log(result)
    });
});