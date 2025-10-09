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

export const getCarByMotorId = async (motorsport_id: Number) => {
    const [rows] = await promisePool.query("SELECT c.carmodel_id, c.car_type, c.engine, c.manufacturer, c.product_year, tp.team_id, tm.team_name , m.motorsport_id FROM car c INNER JOIN tournament_participating tp ON c.team_id = tp.team_id INNER JOIN team tm ON tp.team_id = tm.team_id INNER JOIN tournaments t ON t.tournament_id = tp.tournament_id INNER JOIN motorsport m ON m.motorsport_id = t.motorsport_id WHERE m.motorsport_id = ?", motorsport_id);
    return rows;
}

export const getCarByTeamId = async (team_id: Number) => {
    const [rows] = await promisePool.query("SELECT c.carmodel_id, c.car_type, c.engine, c.manufacturer, c.product_year, c.team_id FROM car c WHERE c.team_id = ?", team_id);
    return rows;
}

export const getCarByModelId = async (carmodel_id: Number) => {
    const [rows] = await promisePool.query("SELECT c.carmodel_id, c.car_type, c.engine, c.manufacturer, c.product_year, t.team_name, t.team_id FROM car c INNER JOIN team t ON c.team_id = t.team_id WHERE c.carmodel_id = ?", carmodel_id);
    return rows;
}

export const getTeamRoster = async () => {
    const [rows] = await promisePool.query("SELECT * FROM team_roster");
    return rows;
}

/*
getTournament
- ให้ filter motorsport_id ได้ (เอาไปใช้ Table List ในหน้า Tournaments)
- ให้ filter tournament_id ได้ (เอาไปใช้ TournamentDetail)
*/

export const getTournaments = async () => {
    const [rows] = await promisePool.query("SELECT * FROM tournaments ORDER BY tournament_name ASC");
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

/* 
getTeam
- ให้ filter motorsport_id ได้ (เอาไปใช้ Table List ในหน้า Teams)
- ให้ filter team_id ได้ (เอาไปใช้ TeamDetail)
 */

export const getTeam = async () => {
    const [rows] = await promisePool.query("SELECT * FROM team ORDER BY team_name ASC");
    return rows;
}

/* 
getTournamentParticipating
    - ให้ filter tournament_id ได้ แล้ว return มาเป็นอันดับเรียงจากน้อยไปมาก แล้วก็เพิ่ม team_name ด้วย
 */
export const getTournamentParticipating = async () => {
    const [rows] = await promisePool.query("SELECT * FROM tournament_participating");
    return rows;
}

export const getRacer = async () => {
    const [rows] = await promisePool.query("SELECT * FROM staff");
    return rows;
}
export const getReferee = async () => {
    const [rows] = await promisePool.query("SELECT p.person_id, p.first_name, p.last_name, p.status, p.nationality, s.years_experience, s.referee_license FROM person p INNER JOIN staff s ON p.person_id = s.person_id WHERE s.staff_type = 'Referee' ORDER BY p.first_name ASC");
    return rows;
}

export const getCaster = async () => {
    const [rows] = await promisePool.query("SELECT p.person_id, p.first_name, p.last_name, p.status, p.nationality, s.years_experience, s.language FROM person p INNER JOIN staff s ON p.person_id = s.person_id WHERE s.staff_type = 'Caster' ORDER BY p.first_name ASC");
    return rows;
}

export const getStaff = async () => {
    const [rows] = await promisePool.query("SELECT p.first_name, p.last_name, p.status, p.nationality, p.date_of_birth, s.years_experience, s.staff_type, s.referee_license, s.language FROM person p INNER JOIN staff s ON p.person_id = s.person_id ORDER BY p.first_name");
    return rows;
}

export const searchData = async (keyword: String) => {
    const [carRows] = await promisePool.query("SELECT c.carmodel_id, c.car_type, c.engine, c.manufacturer, c.product_year, m.motorsport_type FROM car c INNER JOIN team t ON c.team_id = t.team_id INNER JOIN tournament_participating tp ON tp.team_id = t.team_id INNER JOIN tournaments tm ON tm.tournament_id = tp.tournament_id INNER JOIN motorsport m ON m.motorsport_id = tm.motorsport_id WHERE c.car_type LIKE ? OR c.engine LIKE ? OR c.manufacturer LIKE ? OR c.product_year LIKE ? ORDER BY m.motorsport_type ASC",
        ['%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%']);
    const [racerRows] = await promisePool.query(
        "SELECT DISTINCT p.person_id, DISTINCT tr.team_id, tr.team_name, p.first_name, p.last_name, m.motorsport_type FROM person p INNER JOIN racer r ON p.person_id = r.person_id INNER JOIN team_roster tr ON p.person_id = tr.person_id INNER JOIN tournament_participating tp ON tr.team_id = tp.team_id INNER JOIN tournaments t ON tp.tournament_id = t.tournament_id INNER JOIN motorsport m ON t.motorsport_id =  m.motorsport_id WHERE p.first_name LIKE ? OR p.last_name LIKE ? ORDER BY p.first_name ASC",
        ['%' + keyword + '%', '%' + keyword + '%']
    );
    const [teamRows] = await promisePool.query("SELECT t.team_id, t.team_name, m.motorsport_type FROM team t INNER JOIN tournament_participating tp ON t.team_id = tp.team_id INNER JOIN tournaments tm ON tm.tournament_id = tp.tournament_id INNER JOIN motorsport m ON tm.motorsport_id = m.motorsport_id WHERE t.team_name LIKE ? ORDER BY t.team_name ASC", '%' + keyword + '%');
    const [tournamentRows] = await promisePool.query("SELECT t.tournament_id, t.tournament_name, t.date_of_match, t.circuit_street, t.circuit_city, t.circuit_state, t.circuit_zip, m.motorsport_type FROM tournaments t INNER JOIN motorsport m ON m.motorsport_id = t.motorsport_id WHERE tournament_name LIKE ? OR circuit_state LIKE ? ORDER BY p.first_name ASC", ['%' + keyword + '%', '%' + keyword + '%']);
    const [staffRows] = await promisePool.query("SELECT p.person_id, p.first_name, p.last_name, s.staff_type, s.years_experience FROM person p INNER JOIN staff s ON p.person_id = s.person_id WHERE p.first_name LIKE ? OR p.last_name LIKE ? ORDER BY p.first_name ASC", ['%' + keyword + '%', '%' + keyword + '%']);

    return {
        cars: carRows,
        racers: racerRows,
        teams: teamRows,
        tournaments: tournamentRows,
        staffs: staffRows
    };
}

export default promisePool;





/*

Staff Search return person_id, first_name, last_name, staff_type, year_experience */