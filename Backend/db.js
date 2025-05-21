import mysql from "mysql2"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Mysql@@2002",
    database:"blog",
    multipleStatements:true,
})

 /*const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Mysql@@2002",
    database:"blog",
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

export default db;*/


