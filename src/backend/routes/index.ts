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
    getTournamentByPersonId,
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
    updateStaff
} from '../config/db'
import { data } from 'react-router-dom';

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
/* Usage NOTE: http://localhost:3000/add/racer/Krittameth/Tansuwan/Retired/2005-07-15/Thai/69420 */
// ADD RACER
router.post('/add/racer/:firstName/:lastName/:status/:dateOfBirth/:nationality/:racerLicense', async (req, res) => {
    const data = {
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        status: req.params.status,
        dateOfBirth: req.params.dateOfBirth,
        nationality: req.params.nationality,
        racerLicense: parseInt(req.params.racerLicense)
    };
    try {
        const result = await addRacer(data.firstName, data.lastName, data.status, data.dateOfBirth, data.nationality, data.racerLicense);
        console.log(result);
        return res.status(201).send({ message: `Successfully added ${data.firstName} ${data.lastName}` });
    } catch (err) {
        console.log(err)
        return res.status(409).send({ message: "Cannot add a racer." });
    }
});
// ADD TOURNAMENT
router.post('/add/tournament/:name/:date/:street/:city/:state/:zip/:viewerNum/:motorId/:casterId/:refereeId', async (req, res) => {
    const data = {
        tournamentName: req.params.name,
        dateOfMatch: req.params.date,
        street: req.params.street,
        city: req.params.city,
        state: req.params.state,
        zip: parseInt(req.params.zip),
        viewerCount: parseInt(req.params.viewerNum),
        motorId: parseInt(req.params.motorId),
        casterId: parseInt(req.params.casterId),
        refereeId: parseInt(req.params.refereeId)
    };
    try {
        const result = await addTournament(data.tournamentName, data.dateOfMatch, data.street, data.city, data.state, data.zip, data.viewerCount, data.motorId, data.casterId, data.refereeId);
        console.log(result)
        return res.status(201).send({ message: `Successfully added ${data.tournamentName} ${data.dateOfMatch}` });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot add a tournament." });
    }
});

// ADD TEAM
router.post('/add/team/:name/:sponsor/:country/:totalWin', async (req, res) => {
    const data = {
        name: req.params.name,
        sponsor: req.params.sponsor,
        country: req.params.country,
        totalWin: parseInt(req.params.totalWin)
    }

    try {
        const result = await addTeam(data.name, data.sponsor, data.country, data.totalWin);
        console.log(result);
        return res.status(201).send({ message: `Successfully added ${data.name} ${data.country}` });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot add a team." });
    }
});

// ADD REFEREE
router.post('/add/staff/referee/:firstName/:lastName/:status/:dateOfBirth/:nationality/:yearsExperience/:refereeLicense', async (req, res) => {
    const data = {
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        status: req.params.status,
        dateOfBirth: req.params.dateOfBirth,
        nationality: req.params.nationality,
        yearExp: parseInt(req.params.yearsExperience),
        license: req.params.refereeLicense
    }
    try {
        const result = await addStaffReferee(data.firstName, data.lastName, data.status, data.dateOfBirth, data.nationality, data.yearExp, data.license)
        console.log(result);
        return res.status(201).send({ message: `Successfully added ${data.firstName} ${data.lastName} as Referee Staff` });

    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot add a referee." });
    }
});
// ADD CASTER
router.post('/add/staff/caster/:firstName/:lastName/:status/:dateOfBirth/:nationality/:yearsExperience/:language', async (req, res) => {
    const data = {
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        status: req.params.status,
        dateOfBirth: req.params.dateOfBirth,
        nationality: req.params.nationality,
        yearExp: parseInt(req.params.yearsExperience),
        lang: req.params.language
    }
    try {
        const result = await addStaffCaster(data.firstName, data.lastName, data.status, data.dateOfBirth, data.nationality, data.yearExp, data.lang)
        console.log(result);
        return res.status(201).send({ message: `Successfully added ${data.firstName} ${data.lastName} as Referee Staff` });

    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot add a caster." });
    }
});
// ADD CAR
router.post('/add/car/:carType/:engine/:manufacturer/:year', async (req, res) => {
    const data = {
        carType: req.params.carType,
        engine: req.params.engine,
        manufacturer: req.params.manufacturer,
        year: req.params.year
    }
    try {
        const result = await addCar(data.carType, data.engine, data.manufacturer, data.year);
        console.log(result);
        return res.status(201).send({ message: `Successfully added ${data.carType} ${data.engine} ${data.manufacturer} ${data.year}` });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot add a car" });
    }
});

//////////////////////////////////////////////////////////////////////                  UPDATE
router.put('/update/racer/:racerId/:firstName/:lastName/:status/:dateOfBirth/:nationality/:racerLicense', async (req, res) => {
    const data = {
        racerId: parseInt(req.params.racerId),
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        status: req.params.status,
        dateOfBirth: req.params.dateOfBirth,
        nationality: req.params.nationality,
        license: parseInt(req.params.racerLicense)
    }
    try {
        const result = await updateRacer(data.racerId, data.firstName, data.lastName, data.status, data.dateOfBirth, data.nationality, data.license);
        console.log(result);
        return res.status(204).send({ message: `Successfully updated ${data.racerId}, ${data.firstName}, ${data.lastName}.` });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot update a racer." });
    }
});

router.put('/update/tournament/:tournamentId/:name/:date/:street/:city/:state/:zip/:viewerNum/:motorId/:casterId/:refereeId', async (req, res) => {
    const data = {
        tournamentId: parseInt(req.params.tournamentId),
        tournamentName: req.params.name,
        dateOfMatch: req.params.date,
        street: req.params.street,
        city: req.params.city,
        state: req.params.state,
        zip: parseInt(req.params.zip),
        viewerCount: parseInt(req.params.viewerNum),
        motorId: parseInt(req.params.motorId),
        casterId: parseInt(req.params.casterId),
        refereeId: parseInt(req.params.refereeId)
    };

    try {
        const result = await updateTournament(data.tournamentId, data.tournamentName, data.dateOfMatch, data.street, data.city, data.state, data.zip, data.viewerCount, data.motorId, data.casterId, data.refereeId);
        console.log(result);
        return res.status(204).send({ message: `Successfully updated ${data.tournamentId}, ${data.tournamentName}.` });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot update a tournament." });
    }
});

router.put('/update/team/:teamId/:name/:sponsor/:country/:totalWin', async (req, res) => {
    const data = {
        teamId: parseInt(req.params.teamId),
        name: req.params.name,
        sponsor: req.params.sponsor,
        country: req.params.country,
        totalWin: parseInt(req.params.totalWin)
    }
    try {
        const result = await updateTeam(data.teamId, data.name, data.sponsor, data.country, data.totalWin);
        console.log(result);
        return res.status(204).send({ message: `Successfully updated ${data.name}, ${data.country}.` });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot update a team." })

    }
});

router.put('/update/staff/:id/:firstName/:lastName/:status/:dateOfBirth/:nationality/:yearsExperience/:staffType/:refereeLicense/:language', async (req, res) => {
    const id: number = parseInt(req.params.id);
    const { firstName, lastName, status, dateOfBirth, nationality, yearsExperience, staffType, refereeLicense, language } = req.params;
    try {
        const result = await updateStaff(id, firstName, lastName, status, dateOfBirth, nationality, parseInt(yearsExperience), staffType, refereeLicense, language);
        console.log(result);
        return res.status(204).send({ message: `Successfully updated ${firstName}, ${lastName}.` });
    } catch (err) {
        console.log(err);
        return res.status(409).send({ message: "Cannot update a staff." })
    }
});
export default router;