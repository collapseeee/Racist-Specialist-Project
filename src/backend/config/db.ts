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

export const getTournaments = async () => {
    const [rows] = await promisePool.query("SELECT * FROM tournaments");
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

export const getTournamentParticipating = async () => {
    const [rows] = await promisePool.query("SELECT * FROM tournament_participating");
    return rows;
}

export const getRacer = async () => {
    const [rows] = await promisePool.query("SELECT * FROM staff");
    return rows;
}

export const searchData = async (keyword: String) => {
    const [carRows] = await promisePool.query("SELECT c.carmodel_id, c.car_type, c.engine, c.manufacturer, c.product_year, m.motorsport_type FROM car c INNER JOIN team t ON c.team_id = t.team_id INNER JOIN tournament_participating tp ON tp.team_id = t.team_id INNER JOIN tournaments tm ON tm.tournament_id = tp.tournament_id INNER JOIN motorsport m ON m.motorsport_id = tm.motorsport_id WHERE c.car_type LIKE ? OR c.engine LIKE ? OR c.manufacturer LIKE ? OR c.product_year LIKE ?",
        ['%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%']);
    const [racerRows] = await promisePool.query(
        "SELECT DISTINCT p.person_id, tr.team_id, tr.team_name, p.first_name, p.last_name, m.motorsport_type FROM person p INNER JOIN racer r ON p.person_id = r.person_id INNER JOIN team_roster tr ON p.person_id = tr.person_id INNER JOIN tournament_participating tp ON tr.team_id = tp.team_id INNER JOIN tournaments t ON tp.tournament_id = t.tournament_id INNER JOIN motorsport m ON t.motorsport_id =  m.motorsport_id WHERE p.first_name LIKE ? OR p.last_name LIKE ?",
        ['%' + keyword + '%', '%' + keyword + '%']
    );
    const [teamRows] = await promisePool.query("SELECT t.team_id, t.team_name, m.motorsport_type FROM team t INNER JOIN tournament_participating tp ON t.team_id = tp.team_id INNER JOIN tournaments tm ON tm.tournament_id = tp.tournament_id INNER JOIN motorsport m ON tm.motorsport_id = m.motorsport_id WHERE t.team_name LIKE ?", '%' + keyword + '%');
    const [tournamentRows] = await promisePool.query("SELECT t.tournament_id, t.tournament_name, t.date_of_match, t.circuit_street, t.circuit_city, t.circuit_state, t.circuit_zip, m.motorsport_type FROM tournaments t INNER JOIN motorsport m ON m.motorsport_id = t.motorsport_id WHERE tournament_name LIKE ? OR circuit_state LIKE ?", ['%' + keyword + '%', '%' + keyword + '%']);


    return {
        cars: carRows,
        racers: racerRows,
        teams: teamRows,
        tournaments: tournamentRows
    };
}

export default promisePool;