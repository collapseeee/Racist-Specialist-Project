import { Router } from 'express'
import {
    getCar, getMotorsport, getTournaments
    , getTeam, getTournamentParticipating
    , getMotorsportType, searchData
    , getCarByModelId, getCarByMotorId, getCarByTeamId
    , getCaster, getRacer, getReferee, getStaff, getTeamRoster
} from '../config/db'
import { QueryResult } from 'mysql2';

const router = Router();

router.get('/car', async (req, res) => {
    const data = await getCar();
    console.log("GET CAR");
    res.send({
        data
    });
});

router.get('/car/motorsport:id', async (req, res) => {
    const motorId: String = req.params.id.replace(':', '').trim();
    const id: Number = Number(motorId);
    const data = await getCarByMotorId(id);
    console.log('GET CAR BY MOTORSPORT_ID: ', id);

    res.send({
        data
    });
});

router.get('/car/team:id', async (req, res) => {
    const teamId: String = req.params.id.replace(':', '').trim();
    const id: Number = Number(teamId);
    const data = await getCarByTeamId(id);

    res.send({
        data
    });
});

router.get('/car/model:id', async (req, res) => {
    const modelId: String = req.params.id.replace(':', '').trim();
    const id: Number = Number(modelId);
    const data = await getCarByModelId(id);

    res.send({
        data
    });
});


router.get('/matches', async (req, res) => {
    const data = await getTournaments();
    console.log("GET TOURNAMENTS");
    res.send({
        data
    });
});

router.get('/team', async (req, res) => {
    const data = await getTeam();
    console.log("GET TEAM");
    res.send({
        data
    });
});

router.get('/motorsport:type', async (req, res) => {
    const type = req.params.type.replace(':', '');
    console.log(type)
    const data = await getMotorsportType(type);
    console.log("GET MOTORSPORT TYPE");
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

router.get('/participation', async (req, res) => {
    const data = await getTournamentParticipating();
    console.log("GET TOURNAMENT_PARTICIPATION");
    res.send({
        data
    });
});

router.get('/search:keyword', async (req, res) => {
    const keyword = req.params.keyword.replace(':', '');
    const data = await searchData(keyword);

    console.log(`SEARCHING FOR ${keyword}`);
    res.send({
        data
    })
});

export default router;