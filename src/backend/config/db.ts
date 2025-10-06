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

export const getCar = async () => {
    const [rows] = await promisePool.query("SELECT * FROM car");
    return rows;
}

export const getMatches = async () => {
    const [rows] = await promisePool.query("SELECT * FROM matches");
    return rows
}

export const getMotorsport = async () => {
    const [rows] = await promisePool.query("SELECT * FROM motorsport");
    return rows;
}

export const getMotorsportType = async (type: String) => {
    const [rows] = await promisePool.query(`SELECT * FROM motorsport WHERE motorsport_type = ?`, type)
    return rows;
}

export const getTeam = async () => {
    const [rows] = await promisePool.query("SELECT * FROM team");
    return rows;
}

export const getMatchParticipating = async () => {
    const [rows] = await promisePool.query("SELECT * FROM match_participating");
    return rows;
}

export const getRacer = async () => {
    const [rows] = await promisePool.query("SELECT * FROM staff");
    return rows;
}

export const searchData = async (keyword: String) => {
    const [carRows] = await promisePool.query("SELECT c.carmodel_id, c.car_type, c.engine, c.manufacturer, c.product_year FROM car c WHERE c.car_type LIKE ? OR c.engine LIKE ? OR c.manufacturer LIKE ? OR c.product_year LIKE ?",
        ['%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%']);
    const [racerRows] = await promisePool.query(
        "SELECT p.person_id, tr.team_id, tr.team_name, p.first_name, p.last_name FROM person p INNER JOIN racer r ON p.person_id = r.person_id INNER JOIN team_roster tr ON p.person_id = tr.person_id WHERE p.first_name LIKE ? OR p.last_name LIKE ?",
        ['%' + keyword + '%', '%' + keyword + '%']
    );
    const [teamRows] = await promisePool.query("SELECT team_id, team_name FROM team WHERE team_name LIKE ?", '%' + keyword + '%');
    const [tournamentRows] = await promisePool.query("SELECT tournament_id, tournament_name FROM tournaments WHERE tournament_name LIKE ?", '%' + keyword + '%');


    return {
        cars: carRows,
        racers: racerRows,
        teams: teamRows,
        tournaments: tournamentRows
    };
}

export default promisePool;