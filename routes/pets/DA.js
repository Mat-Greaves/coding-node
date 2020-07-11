const mysql = require('mysql');
const { promisify } = require('util');

const sql = require('./sql');

const dbConfig = {
    host: 'localhost',
    database: 'local',
    user: 'root',
    password: 'root',
    port: 3306
}

// Create db connection
const pool = mysql.createConnection(dbConfig);

// Convert the callback to promise
pool.query = promisify(pool.query);

// Get all the pets details 
exports.getPets = idPet => pool.query(sql.GET_PETS_DETAILS, [idPet]);

// Save the pet details
exports.savePet = data => pool.query(sql.SAVE_PET_DETAILS, [
    data.name,
    data.age,
    data.colours,
    data.createdBy,
    data.createdDate
]);

// Delete the pet details by idPet
exports.deletePet = idPet => pool.query(sql.DELETE_PET_DETAILS, [idPet]);