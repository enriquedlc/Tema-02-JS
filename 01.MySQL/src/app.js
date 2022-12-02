const mysql = require('mysql2/promise');

/**
 * createConnection needs: 
 * 1. host
 * 2. user
 * 3. password
 * 4. database
 * 
 * mysql.createConnection({
 * host: 'localhost',
 * user: 'root',
 * password: '1234',
 * database: 'mydb'
 * });
 * 
 * when the program starts is going to execute the connection (IIFE function)
 */

(async () => {
    const connection = await mysql.createConnection({
        host: 'localhost', // 127.0.0.1
        user: 'root',
        password: '1234',
        database: 'sakila'
    });

    connection.connect();
    console.log('Conectado a la base de datos');

    /**
     * save the query in a array variable, and then execute the query
     */

    try {
        console.log('Inicio...');
        const [rows] = await connection.query('SELECT * FROM actores LIMIT 10');
        console.log(rows);
    } catch (error) {
        console.log(error);
    } finally {
        // connection.close(); shows a warning:
        connection.end();
        console.log('Desconectado de la base de datos');
    }
})();
