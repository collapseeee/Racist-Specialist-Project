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
    deleteTeamById
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

router.delete('/delete/tournament/:id', async (req, res) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: `Invalid tournamentId provided.` });
    }

    try {
        const result = await deleteTournamentById(id);
        console.log(result);
        return res.status(200).send({ message: `Tournament successfully deleted!` })

    } catch (err) {
        console.log(`Fail to delete tournament Id ${id} : `, err);
        return res.status(500).send({ message: `An error occurred while deleting the tournament.` })
    }
});

router.delete('/delete/team/:id', async (req, res) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: `Invalid teamId provided.` });
    }

    try {
        const result = await deleteTeamById(id);
        console.log(result);
        return res.status(200).send({ message: `Team successfully deleted!` })

    } catch (err) {
        console.log(`Fail to delete team Id ${id} : `, err);
        return res.status(500).send({ message: `An error occurred while deleting the team.` })
    }
});

router.delete('/delete/car/:id', async (req, res) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: `Invalid carId provided.` });
    }

    try {
        const result = await deleteCarById(id);
        console.log(result);
        return res.status(200).send({ message: `Car successfully deleted!` })

    } catch (err) {
        console.log(`Fail to delete car Id ${id} : `, err);
        return res.status(500).send({ message: `An error occurred while deleting the car.` })
    }
});
router.delete('/delete/racer/:id', async (req, res) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: `Invalid carId provided.` });
    }

    try {
        const result = await deleteRacerById(id);
        console.log(result);
        return res.status(200).send({ message: `Racer successfully deleted!` })

    } catch (err) {
        console.log(`Fail to delete racer Id ${id} : `, err);
        return res.status(500).send({ message: `An error occurred while deleting the racer.` })
    }
});

router.delete('/delete/staff/:id', async (req, res) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: `Invalid carId provided.` });
    }
    try {
        const result = await deleteStaffById(id);
        console.log(result);
        return res.status(200).send({ message: `Staff successfully deleted!` })

    } catch (err) {
        console.log(`Fail to delete staff Id ${id} : `, err);
        return res.status(500).send({ message: `An error occurred while deleting the staff.` })
    }
});


export default router;