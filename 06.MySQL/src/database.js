const mysql = require('mysql2/promise');
const config = require('./config');

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

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
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

module.exports = pool;