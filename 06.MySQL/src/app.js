const pool = require('./database');

// OUR FUNCTIONS

/**
 * rows: the result of the query: an array of objects
 * fields: the metadata of the query: an array of objects: Buffer objects
 * 
 * execute: to execute a query (table)
 * 
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

async function Query2WithoutLimit() {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM actores WHERE actor_id > 190');

        rows.forEach((row) => {
            console.log(row);
        });
    } catch (error) {
        throw error;
    }
}

async function Query3() {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM actores WHERE actor_id = 100');

        console.log('Los datos de los actores son:\n', rows);
    } catch (error) {
        throw error;
    }
}

async function Query4() {
    try {
        const id = 100;
        const [rows, fields] = await pool.execute('SELECT * FROM actores WHERE actor_id =' + id);

        console.log('Los datos de los actores con Id = ' + id + ' son:\n', rows);
    } catch (error) {
        throw error;
    }
}

async function Query5() {
    try {
        const id = 100;
        const [rows, fields] = await pool.execute('SELECT * FROM actores WHERE actor_id = ?', [id]);

        console.log('Los datos de los actores con Id = ' + id + ' son:\n', rows);
    } catch (error) {
        throw error;
    }
}

async function Query6() {
    try {
        const actor = { first_name: 'Acceso', last_name: 'Datos' };
        const [result] = await pool.query(
            'INSERT INTO actores SET ?',
            actor
        )
        console.log(`Nuevo actor insertado con Id: ${result.insertId}`);
    } catch (error) {
        throw error;
    }
}

async function Query7() {
    try {
        const actor = ['AccesoV2', 'DatosV2', 205];
        const [result] = await pool.query('UPDATE actores SET first_name = ?, last_name = ? WHERE actor_id = ?',
            actor
        );
        console.log(`Affected rows: ${result.affectedRows}`);
    } catch (error) {
        throw error;
    }
}

async function Query8() {
    try {
        const name = 'AccesoV3'
        const last_name = 'DatosV3'
        const actor_id = 205
        const [result] = await pool.query('UPDATE actores SET first_name = ?, last_name = ? WHERE actor_id = ?',
            [name, last_name, actor_id]
        );
        console.log(`Affected rows: ${result.affectedRows}`);
    } catch (error) {
        throw error;
    }
}

/**
 * for Query9() we need to use the module mysql2
 */
const mysql = require('mysql2');
async function Query9() {
    try {
        const name = 'AccesoV4'
        const last_name = 'DatosV4'
        const actor_id = 205

        const queryText = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
        const updateQuery = mysql.format(queryText, ['actores', 'first_name', name, 'last_name', last_name, 'actor_id', actor_id]);

        const [result] = await pool.query(updateQuery);
        console.log(`Affected rows: ${result.affectedRows}`);
    } catch (error) {
        throw error;
    }
}

async function Query10() {
    try {
        const actor_id = 198
        const [result] = await pool.query('DELETE FROM actores WHERE actor_id >= ?',
            [actor_id]
        );
        console.log(`Affected rows (deleted): ${result.affectedRows}`);
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
        // await Query2();
        await Query3(); // select actor by id
        await Query4(); // select actor by id
        await Query5(); // select actor by id
        // await Query6(); // insert
        // await Query7(); // modify
        // await Query8(); // modifyV2
        // await Query9(); // modifyV3
        // await Query10(); // delete
        // await Query2WithoutLimit();
    } catch (error) {
        console.log(error);
    } finally {
        pool.end();
        console.log('Desconectado de la base de datos');
    }
})();
