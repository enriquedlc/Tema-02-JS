const mysql = require('mysql2/promise');

/**
 * createPool needs:
 * 1. host
 * 2. user
 * 3. password
 * 4. database
 * 5. connectionLimit
 * 6. waitForConnections
 * 7. queueLimit
 * 8. charset
 * 
 * connectionLimit: number of connections that can be created at the same time
 * waitForConnections: if the connection limit is reached, the program will wait for a connection to be released
 * queueLimit: number of requests that can be queued if the connection limit is reached
 * charset: character set
 * 
 * ENVIROMENT VARIABLES
 * console.log(process.env.DB_HOST); THE HOST IP 
 * console.log(process.env.DB_DATABASE); THE DATABASE NAME
 * 
 */

require('dotenv').config();

console.log(process.env.DB_HOST);
console.log(process.env.DB_DATABASE);

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'sakila',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
});

/**
 * functions
 * 
 * pool.on recieves two parameters:
 * 1. event: the event that we want to listen, the event is a string and the events are: 
 *      - connection: when a connection is created
 *      - enqueue: when a request is queued
 *      - release: when a connection is released
 * 
 * 2. callback: the function that we want to execute when the event is triggered
 * 
 * pool.exe
 */

pool.on('connection', (connection) => {
    console.log('Conectado al pool');
})

pool.on('realese', (connection) => {
    console.log('Connection %d released', connection.threadId);
});

// OUR FUNCTIONS

/**
 * rows: the result of the query: an array of objects
 * fields: the metadata of the query: an array of objects: Buffer objects
 */

async function Query1() {
    const [rows, fields] = await pool.execute('SELECT 1');

    console.log(rows);
    console.log(fields);


}

async function Query2() {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM actores LIMIT 10');

        rows.forEach((row) => {
            console.log(row);
        });

    } catch (error) {
        throw error;
    }
}

// MAIN

(async () => {
    /**
     * await Query1(); to execute the function
     * the function is going to execute the query
     * 
     * pool.end(); to close the pool. not .close();
     */

    try {
        console.log('Inicio...');
        await Query2();
    } catch (error) {
        console.log(error);
    } finally {
        pool.end();
        console.log('Desconectado de la base de datos');
    }
})();