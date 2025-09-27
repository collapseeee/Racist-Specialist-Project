import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const promisePool = pool.promise();

export const getCar = async() => {
    const [rows] = await promisePool.query("SELECT * FROM car");
    return rows;
}

export const getMatches = async() => {
    const [rows] = await promisePool.query("SELECT * FROM matches");
    return rows
}

export const getMotorsport = async() => {
    const [rows] = await promisePool.query("SELECT * FROM motorsport");
    return rows;
}

export const getMotorsportType = async(type: String) => {
    const [rows] = await promisePool.query(`SELECT * FROM motorsport WHERE motorsport_type = ?`, type)
    return rows;
}

export const getTeam = async() => {
    const [rows] = await promisePool.query("SELECT * FROM team");
    return rows;
}

export const getMatchParticipating = async() => {
    const [rows] = await promisePool.query("SELECT * FROM match_participating");
    return rows;
}

export default promisePool;