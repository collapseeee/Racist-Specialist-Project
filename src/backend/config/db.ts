import mysql, { ResultSetHeader } from 'mysql2';
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

export const getCarByMotorId = async (motorsport_id: number) => {
    const [rows] = await promisePool.query("SELECT DISTINCT c.carmodel_id, c.car_type, c.engine, c.manufacturer, c.product_year, tp.team_id, tm.team_name , m.motorsport_id FROM car c INNER JOIN tournament_participating tp ON c.team_id = tp.team_id INNER JOIN team tm ON tp.team_id = tm.team_id INNER JOIN tournaments t ON t.tournament_id = tp.tournament_id INNER JOIN motorsport m ON m.motorsport_id = t.motorsport_id WHERE m.motorsport_id = ?"
        , motorsport_id);
    return rows;
}

export const getCarByTeamId = async (team_id: number) => {
    const [rows] = await promisePool.query("SELECT c.carmodel_id, c.car_type, c.engine, c.manufacturer, c.product_year, c.team_id FROM car c WHERE c.team_id = ?"
        , team_id);
    return rows;
}

export const getCarByModelId = async (carmodel_id: number) => {
    const [rows] = await promisePool.query("SELECT c.carmodel_id, c.car_type, c.engine, c.manufacturer, c.product_year, t.team_name, t.team_id FROM car c INNER JOIN team t ON c.team_id = t.team_id WHERE c.carmodel_id = ?"
        , carmodel_id);
    return rows;
}

export const getTeamRoster = async () => {
    const [rows] = await promisePool.query("SELECT * FROM team_roster");
    return rows;
}

export const getTeamRosterById = async (team_id: number) => {
    const [rows] = await promisePool.query('SELECT t.team_id, p.person_id, p.first_name, p.last_name, p.status, p.date_of_birth, p.nationality, p.person_type FROM team_roster tr INNER JOIN team t ON tr.team_id = t.team_id INNER JOIN person p ON tr.person_id = p.person_id WHERE t.team_id = ?'
        , [team_id]);

    return rows;
}

export const getTournaments = async () => {
    const [rows] = await promisePool.query("SELECT * FROM tournaments ORDER BY tournament_name ASC");
    return rows
}

export const getTournamentsById = async (tournament_id: number) => {
    const [rows] = await promisePool.query('SELECT t.tournament_id, t.tournament_name, t.date_of_match, t.circuit_street, t.circuit_city, t.circuit_state, t.circuit_zip, t.average_viewer_count, t.caster_id, t.referee_id, t.motorsport_id, m.motorsport_type, m.terrain FROM tournaments t JOIN motorsport m ON t.motorsport_id = m.motorsport_id WHERE t.tournament_id = ?',
        tournament_id);
    return rows;
}

export const getTournamentsByTeamId = async (team_id: number) => {
    const [rows] = await promisePool.query('SELECT tm.tournament_id, tm.tournament_name, tm.date_of_match, tp.placement, tp.average_laps_time, m.motorsport_type, tm.motorsport_id FROM tournaments tm INNER JOIN tournament_participating tp ON tm.tournament_id = tp.tournament_id INNER JOIN team t ON tp.team_id = t.team_id INNER JOIN motorsport m ON tm.motorsport_id = m.motorsport_id WHERE t.team_id = ? ORDER BY date_of_match DESC',
        team_id);
    return rows;
}

export const getTournamentsByMotorId = async (motorsport_id: number) => {
    const [rows] = await promisePool.query('SELECT t.tournament_id, t.tournament_name, t.date_of_match, t.circuit_street, t.circuit_city, t.circuit_state, t.circuit_zip, t.average_viewer_count, t.caster_id, t.referee_id, t.motorsport_id FROM tournaments t WHERE t.motorsport_id = ?',
        motorsport_id);
    return rows;
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
    const [rows] = await promisePool.query("SELECT * FROM team ORDER BY team_name ASC");
    return rows;
}

export const getTeamById = async (team_id: number) => {
    const [rows] = await promisePool.query("SELECT t.team_id, t.team_name, t.sponsor, t.country, t.win_count FROM team t WHERE t.team_id = ? ORDER BY t.team_name ASC", team_id);
    return rows;
}

export const getTeamByPersonId = async (person_id: number) => {
    const [rows] = await promisePool.query('SELECT t.team_id, t.team_name, t.country, t.sponsor, t.win_count FROM team t INNER JOIN team_roster tr ON t.team_id = tr.team_id WHERE tr.person_id = ?'
        , person_id
    );
    return rows
}

export const getTeamByMotorId = async (motrosport_id: number) => {
    const [rows] = await promisePool.query('SELECT DISTINCT t.team_id, t.team_name, t.sponsor, t.country, t.win_count, m.motorsport_id FROM team t INNER JOIN tournament_participating tp ON tp.team_id = t.team_id INNER JOIN tournaments tm ON tm.tournament_id = tp.tournament_id INNER JOIN motorsport m ON tm.motorsport_id = m.motorsport_id WHERE m.motorsport_id = ? ORDER BY t.team_name ASC', motrosport_id)
    return rows;
}

export const getTournamentParticipating = async () => {
    const [rows] = await promisePool.query("SELECT * FROM tournament_participating");
    return rows;
}

export const getTournamentParticipatingById = async (tournament_id: number) => {
    const [rows] = await promisePool.query('SELECT tp.tournament_id, tp.team_id, t.team_name, tp.average_laps_time, tp.start_time, tp.finish_time, tp.placement FROM tournament_participating tp INNER JOIN team t ON tp.team_id = t.team_id WHERE tp.tournament_id = 20001 ORDER BY tp.placement ASC', tournament_id);
    return rows;
}

export const getPersonById = async (person_id: number) => {
    const [rows] = await promisePool.query('SELECT p.person_id, p.first_name, p.last_name, p.status, p.date_of_birth, p.nationality, person_type FROM person p WHERE p.person_id = ?', person_id);
    return rows;
}

export const getRacer = async () => {
    const [rows] = await promisePool.query("SELECT p.person_id, p.first_name, p.last_name, p.status, p.date_of_birth, p.nationality, r.racer_license FROM racer r INNER JOIN person p ON r.person_id = p.person_id");
    return rows;
}

export const getRacerByMotorId = async (motorsportId: number) => {
    const [rows] = await promisePool.query('SELECT DISTINCT p.person_id, p.first_name, p.last_name, p.status, p.date_of_birth, p.nationality, p.person_type, r.racer_license FROM person p INNER JOIN team_roster tr ON p.person_id = tr.person_id INNER JOIN tournament_participating tp ON tp.team_id = tr.team_id INNER JOIN tournaments tm ON tp.tournament_id = tm.tournament_id INNER JOIN motorsport m ON m.motorsport_id = tm.motorsport_id INNER JOIN racer r ON p.person_id = r.person_id WHERE m.motorsport_id = ? ORDER BY p.first_name ASC'
        , motorsportId
    );
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

export const getStaffById = async (person_id: number) => {
    const [rows] = await promisePool.query('SELECT * FROM person p INNER JOIN staff s ON p.person_id = s.person_id WHERE p.person_id = ?', person_id);
    return rows;
}

export const searchData = async (keyword: string) => {
    const likeKeyword: string = `%${keyword}%`;
    const yearsKeyword: number = parseInt(keyword, 10) || 0;
    const [[carRows], [racerRows], [teamRows], [tournamentRows], staffRows] = await Promise.all([
        promisePool.query(`
            SELECT DISTINCT c.carmodel_id, c.car_type, c.engine, c.manufacturer, c.product_year, t.team_id, t.team_name FROM car c
            INNER JOIN team t ON c.team_id = t.team_id
            WHERE c.car_type LIKE ? OR c.engine
            LIKE ? OR c.manufacturer LIKE ?
            OR c.product_year LIKE ?
            ORDER BY c.car_type ASC`, [likeKeyword, likeKeyword, likeKeyword, yearsKeyword]
        ),
        promisePool.query(`
            SELECT DISTINCT p.person_id, p.first_name, p.last_name, p.status, r.racer_license, p.date_of_birth, p.nationality FROM person p
            INNER JOIN racer r ON p.person_id = r.person_id
            WHERE (CONCAT(p.first_name, ' ', p.last_name) LIKE ?)
            ORDER BY p.first_name ASC;`, likeKeyword),
        promisePool.query(`
            SELECT DISTINCT t.team_id, t.team_name, t.sponsor, t.country, t.win_count FROM team t
            WHERE t.team_name LIKE ?
            ORDER BY t.team_name ASC`, likeKeyword),
        promisePool.query(`
            SELECT DISTINCT t.tournament_id, t.tournament_name, t.date_of_match, t.average_viewer_count, t.circuit_street, t.circuit_city, t.circuit_state, t.circuit_zip, m.motorsport_type, m.motorsport_id, t.referee_id, t.caster_id FROM tournaments t
            INNER JOIN motorsport m ON m.motorsport_id = t.motorsport_id
            WHERE tournament_name LIKE ? OR circuit_state LIKE ?
            ORDER BY t.tournament_name ASC`, [likeKeyword, likeKeyword]),
        promisePool.query(`
            SELECT p.person_id, p.first_name, p.last_name, p.date_of_birth, p.nationality, s.staff_type, s.years_experience, p.status, s.referee_license, s.language FROM person p
            INNER JOIN staff s ON p.person_id = s.person_id
            WHERE (CONCAT(p.first_name, ' ', p.last_name)) LIKE ?
            ORDER BY p.first_name ASC`, likeKeyword)
    ]);

    return {
        cars: carRows,
        racers: racerRows,
        teams: teamRows,
        tournaments: tournamentRows,
        staffs: staffRows
    };
}


///////////////////////////////         DELETE ROW QUERIES (DELETE method)

export const deleteTournamentById = async (id: number) => {
    const [result] = await promisePool.query<ResultSetHeader>(`
        DELETE FROM tournaments t WHERE t.tournament_id = ?;`, id);
    return result;
}

export const deleteCarById = async (id: number) => {
    const [result] = await promisePool.query<ResultSetHeader>(`
        DELETE FROM car c WHERE c.carmodel_id = ?`, id);
    return result;
}

export const deleteTeamById = async (id: number) => {
    const [result] = await promisePool.query<ResultSetHeader>(`
        DELETE FROM team t WHERE t.team_id = ?`, id);
    return result;
}

export const deleteStaffById = async (id: number) => {
    const [result] = await promisePool.query<ResultSetHeader>(`
        DELETE FROM staff s WHERE s.person_id = ?`, id);
    return result;
}
export const deleteRacerById = async (id: number) => {
    const [result] = await promisePool.query<ResultSetHeader>(`
        DELETE FROM person p WHERE p.person_id = ?`, id);
    return result;
}

/////////////////////////////////////////       ADD ROWS QUERIES (POST method)

export const addRacer = async (firstName: string, lastName: string, status: string, dateOfBirth: string, nationality: string, racerLicense: number) => {
    const [person] = await promisePool.query<ResultSetHeader>(`
            INSERT INTO person (first_name, last_name, status, date_of_birth, nationality, person_type)
            VALUES (?, ?, ?, ?, ?, ?);
        `, [firstName, lastName, status, dateOfBirth, nationality, 'Racer']
    );

    const newPersonId = person.insertId;

    await promisePool.query<ResultSetHeader>(`
            INSERT INTO racer (person_id, racer_license)
            VALUES (?, ?)
        `, [newPersonId, racerLicense]
    );

    return {
        personId: newPersonId,
        racer: racerLicense
    };
}

export const addTournament = async (tournamentName: string, dateOfMatch: string, circuitStreet: string, circuitCity: string, circuitState: string, circuitZip: number, averageViewer: number, motorsportId: number, casterId: number, refereeId: number) => {
    const [tournament] = await promisePool.query<ResultSetHeader>(`
            INSERT INTO tournaments (tournament_name, date_of_match, circuit_street, circuit_city, circuit_state, circuit_zip, average_viewer_count, motorsport_id, caster_id, referee_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, [tournamentName, dateOfMatch, circuitStreet, circuitCity, circuitState, circuitZip, averageViewer, motorsportId, casterId, refereeId]
    );

    const tournamentId = tournament.insertId;

    return {
        tournamentId: tournamentId,
        tournamentName: tournamentName
    };
}

export const addTeam = async (teamName: string, sponsor: string, country: string, totalWin: number) => {
    const [team] = await promisePool.query<ResultSetHeader>(`
        INSERT INTO team (team_name, sponsor, country, win_count)
        VALUES (?, ?, ?, ?)
        `, [teamName, sponsor, country, totalWin]
    );

    const teamId = team.insertId;

    return {
        teamId: teamId,
        teamtName: teamName
    };
}

export const addStaffReferee = async (firstName: string, lastName: string, status: string, dateOfBirth: string, nationality: string, yearsExperience: number, refereeLicense: string) => {
    const [person] = await promisePool.query<ResultSetHeader>(`
            INSERT INTO person (first_name, last_name, status, date_of_birth, nationality, person_type)
            VALUES (?, ?, ?, ?, ?, ?);
        `, [firstName, lastName, status, dateOfBirth, nationality, 'Staff']
    );

    const newPersonId = person.insertId;

    await promisePool.query<ResultSetHeader>(`
            INSERT INTO staff (person_id, years_experience, staff_type, referee_license, language)
            VALUES (?, ?, ?, ?, ?)
        `, [newPersonId, yearsExperience, 'Referee', refereeLicense, null]
    );
    return {
        personId: newPersonId,
        refereeLicense: refereeLicense
    };
}

export const addStaffCaster = async (firstName: string, lastName: string, status: string, dateOfBirth: string, nationality: string, yearsExperience: number, language: string) => {
    const [person] = await promisePool.query<ResultSetHeader>(`
            INSERT INTO person (first_name, last_name, status, date_of_birth, nationality, person_type)
            VALUES (?, ?, ?, ?, ?, ?);
        `, [firstName, lastName, status, dateOfBirth, nationality, 'Staff']
    );

    const newPersonId = person.insertId;

    await promisePool.query<ResultSetHeader>(`
            INSERT INTO staff (person_id, years_experience, staff_type, referee_license, language)
            VALUES (?, ?, ?, ?, ?)
        `, [newPersonId, yearsExperience, 'Caster', null, language]
    );

    return {
        personId: newPersonId,
        lang: language
    };
}

export const addCar = async (type: string, engine: string, manufacturer: string, year: string) => {
    const [car] = await promisePool.query<ResultSetHeader>(`
            INSERT INTO car (car_type, engine, manufacturer, product_year)
            VALUES (?, ?, ?, ?);
        `, [type, engine, manufacturer, year]
    );

    const carId = car.insertId;

    return {
        carId: carId
    };
}

////////////////////////////////////////////////            UPDATE (PUT method)

export const updateRacer = async (id: number, firstName: string, lastName: string, status: string, dateOfBirth: string, nationality: string, racerLicense: number) => {
    const [person] = await promisePool.query<ResultSetHeader>(`
        UPDATE person SET first_name = ?, last_name = ?, status = ?, date_of_birth = ?, nationality = ?
        WHERE person_id = ?
        `, [firstName, lastName, status, dateOfBirth, nationality, id]
    );

    const [racer] = await promisePool.query<ResultSetHeader>(`
        UPDATE racer SET racer_license = ?
        WHERE person_id = ?;
        `, [racerLicense, id]
    );

    return {
        person: person,
        racer: racer
    }
}

export const updateCar = async (id: number, type: string, engine: string, manufacturer: string, year: string) => {
    const [car] = await promisePool.query<ResultSetHeader>(`
        UPDATE car SET car_type = ?, engine = ?, manufacturer = ?, product_year = ?
        WHERE carmodel_id = ?`
        , [type, engine, manufacturer, year, id]
    );

    return {
        car: car
    }
}

export const updateTournament = async (id: number, tournamentName: string, dateOfMatch: string, circuitStreet: string, circuitCity: string, circuitState: string, circuitZip: number, averageViewer: number, motorsportId: number, casterId: number, refereeId: number) => {
    const [tournament] = await promisePool.query<ResultSetHeader>(`
        UPDATE tournaments SET tournament_name = ?, date_of_match = ?, circuit_street = ?, circuit_city = ?, circuit_state = ?, circuit_zip = ?, average_viewer_count = ?, motorsport_id = ?, caster_id = ?, referee_id = ?
        WHERE tournament_id = ?;
        `, [tournamentName, dateOfMatch, circuitStreet, circuitCity, circuitState, circuitZip, averageViewer, motorsportId, casterId, refereeId, id]
    );

    return {
        tournament: tournament
    }
}

export const updateTeam = async (id: number, teamName: string, sponsor: string, country: string, totalWin: number) => {
    const [team] = await promisePool.query<ResultSetHeader>(`
        UPDATE team SET team_name = ?, sponsor = ?, country = ?, win_count = ?
        WHERE team_id = ?;
        `, [teamName, sponsor, country, totalWin, id]
    );

    return {
        team: team
    }
}

export const updateStaff = async (id: number, firstName: string, lastName: string, status: string, dateOfBirth: string, nationality: string, yearsExperience: number, staffType: string, refereeLicense: string, lang: string) => {
    const [person] = await promisePool.query<ResultSetHeader>(`
        UPDATE person SET first_name = ?, last_name = ?, status = ?, date_of_birth = ?, nationality = ?
        WHERE person_id = ?
        `, [firstName, lastName, status, dateOfBirth, nationality, id]
    );

    const [staff] = await promisePool.query<ResultSetHeader>(`
        UPDATE staff SET years_experience = ?, staff_type = ?, referee_license = ?, language = ?
        WHERE person_id = ?
        `, [yearsExperience, staffType, refereeLicense, lang, id]
    );

    return {
        person: person,
        staff: staff
    }
}
export default promisePool;