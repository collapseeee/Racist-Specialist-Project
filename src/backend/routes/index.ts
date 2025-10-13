import { Router } from 'express'
import {
    getCar, getMotorsport, getTournaments
    , getTeam, getTournamentParticipating
    , getMotorsportType, searchData
    , getCarByModelId, getCarByMotorId, getCarByTeamId
    , getCaster, getRacer, getReferee, getStaff, getTeamRoster,
    getTournamentsById,
    getTournamentsByMotorId,
    getTournamentParticipatingById,
    getTeamById,
    getTeamByMotorId,
    getTeamRosterById,
    getStaffById,
    getPersonById,
    getTeamByPersonId,
    getRacerByMotorId,
    getTournamentsByTeamId,
    deleteTournamentById,
    deleteStaffById,
    deleteRacerById,
    deleteCarById,
    deleteTeamById,
    addRacer,
    addTournament,
    addStaffReferee,
    addStaffCaster,
    addCar,
    updateRacer,
    updateTournament,
    addTeam,
    updateTeam,
    updateStaff, updateCar
} from '../config/db'

const router = Router();

router.get('/', async (req, res) => {
    return res.status(200);
})

//////////////////////////////////////////////////              GET CAR

router.get('/car', async (req, res) => {
    const data = await getCar();
    console.log("GET CAR");
    res.send({
        data
    });
});

// get car by motorsport_id, team_id, and carmodel_id

router.get('/car/motorsport:id', async (req, res) => {
    const motorId: String = req.params.id.replace(':', '').trim();
    const id: number = Number(motorId);
    const data = await getCarByMotorId(id);
    console.log('GET CAR BY MOTORSPORT_ID: ', id);

    res.send({
        data
    });
});

router.get('/car/team:id', async (req, res) => {
    const teamId: String = req.params.id.replace(':', '').trim();
    const id: number = Number(teamId);
    const data = await getCarByTeamId(id);
    console.log('GET CAR BY TEAM_ID ', id);
    res.send({
        data
    });
});

router.get('/car:id', async (req, res) => {
    const modelId: String = req.params.id.replace(':', '').trim();
    const id: number = Number(modelId);
    const data = await getCarByModelId(id);
    console.log('GET CAR BY CARMODEL_ID ', id);
    res.send({
        data
    });
});


///////////////////////     ////////////////////////////            GET TOURNAMENT
router.get('/tournament', async (req, res) => {
    const data = await getTournaments();
    console.log("GET TOURNAMENTS");
    res.send({
        data
    });
});

// get tournament by tournament_id and motorsport_id
router.get('/tournament:id', async (req, res) => {
    const tournamentId: String = req.params.id.replace(':', '').trim();
    const id: number = Number(tournamentId);
    const data = await getTournamentsById(id);
    console.log('GET TOURNAMENT BY ID ', id)
    res.send({
        data
    });
});

router.get('/tournament/motorsport:motorId', async (req, res) => {
    const motorsportId: String = req.params.motorId.replace(':', '').trim();
    const id: number = Number(motorsportId);
    const data = await getTournamentsByMotorId(id);
    console.log('GET TOURNAMENT BY MOTORSPORT ID ', id);
    res.send({
        data
    });
});

router.get('/tournament/team:id', async (req, res) => {
    const teamId: String = req.params.id.replace(':', '').trim();
    const id: number = Number(teamId);

    const data = await getTournamentsByTeamId(id);
    console.log('GET TOURNAMENT BY TEAM ID ', id);
    res.send({
        data
    });
});

//////////////////////////////////////////////          TEAM

router.get('/team', async (req, res) => {
    const data = await getTeam();
    console.log("GET TEAM");
    res.send({
        data
    });
});

router.get('/team:id', async (req, res) => {
    const teamId: String = req.params.id.replace(':', '');
    const id: number = Number(teamId);
    const data = await getTeamById(id)
    res.send({
        data
    });
});

router.get('/team/person:id', async (req, res) => {
    const personId: string = req.params.id.replace(':', '');
    const id: number = Number(personId);
    const data = await getTeamByPersonId(id);
    res.send({
        data
    });
});

router.get('/team/motorsport:id', async (req, res) => {
    const motorsportId: String = req.params.id.replace(':', '');
    const id: number = Number(motorsportId);
    const data = await getTeamByMotorId(id);
    res.send({
        data
    });
});


///////////////////////////////////////////////         TEAM ROSTER
router.get('/teamroster', async (req, res) => {
    const data = await getTeamRoster();
    res.send({
        data
    });
});

// GET team_roster by teamId

router.get('/teamroster/:id', async (req, res) => {
    const teamId: string = req.params.id.replace(':', '');
    const id: number = Number(teamId);
    const data = await getTeamRosterById(id);
    res.send({
        data
    });
});

/////////////////////////////////////////////////////////////           MOTORSPORT
router.get('/motorsport:type', async (req, res) => {
    const type = req.params.type.replace(':', '');
    console.log(type)
    const data = await getMotorsportType(type);
    console.log("GET MOTORSPORT TYPE ", type);
    res.send({
        data
    });
});

router.get('/motorsport', async (req, res) => {
    const data = await getMotorsport();
    console.log("GET MOTORSPORT");
    res.send({
        data
    });
});


/////////////////////////////////////               TOURNAMENT PARTICIPATION
router.get('/participation', async (req, res) => {
    const data = await getTournamentParticipating();
    console.log("GET TOURNAMENT_PARTICIPATION");
    res.send({
        data
    });
});

router.get('/participation:id', async (req, res) => {
    const tournamentId: String = req.params.id.replace(':', '');
    const id: number = Number(tournamentId);
    const data = await getTournamentParticipatingById(id);
    console.log('GET TOURNAMENT_PARTICIPATION BY ID ', id);

    res.send({
        data
    });
});

//////////////////////////////////////////////////////////////////////////////          GET PERSON

// GET person by personId
router.get('/person:id', async (req, res) => {
    const personId: String = req.params.id.replace(':', '');
    const id: number = Number(personId);
    const data = await getPersonById(id);
    res.send({
        data
    });
});

router.get('/racer', async (req, res) => {
    const data = await getRacer();
    res.send({
        data
    });
});

router.get('/racer/motorsport:id', async (req, res) => {
    const motorId: string = req.params.id.replace(':', '');
    const id: number = Number(motorId);
    const data = await getRacerByMotorId(id);
    console.log('GET racer by motorsport id ', id)
    res.send({
        data
    });
});

router.get('/staff', async (req, res) => {
    const data = await getStaff();
    console.log("GET STAFF");
    res.send({
        data
    });
});


// GET staff by personId
router.get('/staff:id', async (req, res) => {
    const personId: String = req.params.id.replace(':', '');
    const id: number = Number(personId);
    const data = await getStaffById(id)
    res.send({
        data
    });
});



// get caster and referee

router.get('/staff/caster', async (req, res) => {
    const data = await getCaster();
    console.log("GET CASTER");
    res.send({
        data
    });
});

router.get('/staff/referee', async (req, res) => {
    const data = await getReferee();
    console.log("GET REFEREE");
    res.send({
        data
    });
});


/////////////////////////////////////////////////////////////////////////           SEARCH
// get all searched data
router.get('/search:keyword', async (req, res) => {
    const keyword = req.params.keyword.replace(':', '');
    const data = await searchData(keyword);
    console.log(`SEARCHING FOR ${keyword}`);
    res.send({
        data
    })
});


/////////////////////////////////////////                                   DELETE


// delete tournament
router.delete('/delete/tournament/:id', async (req, res) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: `Invalid tournamentId provided.` });
    }

    try {
        const result = await deleteTournamentById(id);
        console.log(result);
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: `Tournament not found.` })
        }
        return res.status(200).send({ message: `Tournament successfully deleted!` })

    } catch (err) {
        console.log(`Fail to delete tournament Id ${id} : `, err);
        return res.status(500).send({ message: `An error occurred while deleting the tournament.` })
    }
});

// delete team
router.delete('/delete/team/:id', async (req, res) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: `Invalid teamId provided.` });
    }

    try {
        const result = await deleteTeamById(id);
        console.log(result);
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: `Team not found.` })
        }
        return res.status(200).send({ message: `Team successfully deleted!` })

    } catch (err) {
        console.log(`Fail to delete team Id ${id} : `, err);
        return res.status(500).send({ message: `An error occurred while deleting the team.` })
    }
});

// delete car
router.delete('/delete/car/:id', async (req, res) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: `Invalid carId provided.` });
    }

    try {
        const result = await deleteCarById(id);
        console.log(result);
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: `Car not found.` })
        }
        return res.status(200).send({ message: `Car successfully deleted!` })

    } catch (err) {
        console.log(`Fail to delete car Id ${id} : `, err);
        return res.status(500).send({ message: `An error occurred while deleting the car.` })
    }
});

// delete racer
router.delete('/delete/racer/:id', async (req, res) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: `Invalid racerId provided.` });
    }

    try {
        const result = await deleteRacerById(id);
        console.log(result);
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: `Racer not found.` })
        }
        return res.status(200).send({ message: `Racer successfully deleted!` })

    } catch (err) {
        console.log(`Fail to delete racer Id ${id} : `, err);
        return res.status(500).send({ message: `An error occurred while deleting the racer.` })
    }
});

// delete staff
router.delete('/delete/staff/:id', async (req, res) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: `Invalid staffId provided.` });
    }
    try {
        const result = await deleteStaffById(id);
        console.log(result);
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: `Staff not found.` })
        }
        return res.status(200).send({ message: `Staff successfully deleted!` })

    } catch (err) {
        console.log(`Fail to delete staff Id ${id} : `, err);
        return res.status(500).send({ message: `An error occurred while deleting the staff.` })
    }
});

/////////////////////////////////////////////                                                                                                ADD            /////////////////////////////////
/* Usage NOTE: 
        Content-Type: application/json
        method: POST
        body: {
            "firstName": "John",
            "lastName": "Smith",
            "status": "Active",
            "dateOfBirth": "1985-10-26",
            "nationality": "American",
            "yearsExperience": 10,
            "staffType": "Engineer",
            "refereeLicense": "REF-998877",
            "language": "English"
        }
    */
// ADD RACER
router.post('/racer', async (req, res) => {
    // Data comes from the JSON request body
    const { firstName, lastName, status, dateOfBirth, nationality, racerLicense } = req.body;
    try {
        const result = await addRacer(firstName, lastName, status, dateOfBirth, nationality, racerLicense);
        return res.status(201).send({ message: `Successfully added ${firstName} ${lastName}`, data: result });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot add a racer." });
    }
});

// ADD TOURNAMENT
router.post('/tournament', async (req, res) => {
    const { tournamentName, dateOfMatch, street, city, state, zip, viewerCount, motorId, casterId, refereeId } = req.body;
    try {
        const result = await addTournament(tournamentName, dateOfMatch, street, city, state, zip, viewerCount, motorId, casterId, refereeId);
        return res.status(201).send({ message: `Successfully added ${tournamentName}`, data: result });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot add a tournament." });
    }
});

// ADD TEAM
router.post('/team', async (req, res) => {
    const { name, sponsor, country, totalWin } = req.body;
    try {
        const result = await addTeam(name, sponsor, country, totalWin);
        return res.status(201).send({ message: `Successfully added ${name}`, data: result });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot add a team." });
    }
});

// ADD STAFF (Unified endpoint for Caster and Referee)
router.post('/staff', async (req, res) => {
    const { firstName, lastName, status, dateOfBirth, nationality, yearsExperience, staffType, license, language } = req.body;
    try {
        let result;
        let type: string = staffType;
        type = type.charAt(0).toUpperCase() + type.substring(1, type.length).toLowerCase();
        if (type === 'Referee') {
            result = await addStaffReferee(firstName, lastName, status, dateOfBirth, nationality, yearsExperience, license);
        } else if (type === 'Caster') {
            result = await addStaffCaster(firstName, lastName, status, dateOfBirth, nationality, yearsExperience, language);
        } else {
            return res.status(400).send({ message: "Invalid staffType provided. Must be 'Referee' or 'Caster'." });
        }
        return res.status(201).send({ message: `Successfully added ${firstName} ${lastName} as ${staffType}`, data: result });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot add a staff member." });
    }
});

// ADD CAR
router.post('/car', async (req, res) => {
    const { carType, engine, manufacturer, year } = req.body;
    try {
        const result = await addCar(carType, engine, manufacturer, year);
        return res.status(201).send({ message: `Successfully added car`, data: result });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot add a car" });
    }
});

//////////////////////////////////////////////////////////////////////                  UPDATE
// UPDATE RACER
router.put('/racer/:id', async (req, res) => {
    const racerId = parseInt(req.params.id);
    const { firstName, lastName, status, dateOfBirth, nationality, license } = req.body;
    try {
        const result = await updateRacer(racerId, firstName, lastName, status, dateOfBirth, nationality, license);
        console.log(result);
        return res.status(200).send({ message: `Successfully updated racer ID ${racerId}.` });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot update a racer." });
    }
});

router.put('/car/:id', async (req, res) => {
    const carId = parseInt(req.params.id);
    const { carType, engine, manufacturer, productYear } = req.body;
    try {
        const result = await updateCar(carId, carType, engine, manufacturer, productYear);
        console.log(result);
        return res.status(200).send({ message: `Successfully updated car model ID ${carId}.` })
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot update a car." });
    }
})

// UPDATE TOURNAMENT
router.put('/tournament/:id', async (req, res) => {
    const tournamentId = parseInt(req.params.id);
    const { tournamentName, dateOfMatch, street, city, state, zip, viewerCount, motorId, casterId, refereeId } = req.body;
    try {
        const result = await updateTournament(tournamentId, tournamentName, dateOfMatch, street, city, state, zip, viewerCount, motorId, casterId, refereeId);
        console.log(result);
        return res.status(200).send({ message: `Successfully updated tournament ID ${tournamentId}.` });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot update a tournament." });
    }
});

// UPDATE TEAM
router.put('/team/:id', async (req, res) => {
    const teamId: number = parseInt(req.params.id);

    const { name, sponsor, country, totalWin } = req.body;
    try {
        const result = await updateTeam(teamId, name, sponsor, country, totalWin);
        console.log(result);
        return res.status(200).send({ message: `Successfully updated team ID ${teamId}.` });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot update a team." });
    }
});

// UPDATE STAFF
router.put('/staff/:id', async (req, res) => {
    const staffId: number = parseInt(req.params.id);
    const { firstName, lastName, status, dateOfBirth, nationality, yearsExperience, staffType, refereeLicense, language } = req.body;
    try {
        const result = await updateStaff(staffId, firstName, lastName, status, dateOfBirth, nationality, yearsExperience, staffType, refereeLicense, language);
        console.log(result);
        return res.status(200).send({ message: `Successfully updated staff ID ${staffId}.` });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot update a staff member." });
    }
});

export default router;