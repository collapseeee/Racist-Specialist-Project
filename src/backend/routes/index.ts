import { Router } from 'express'
import {
    getCar, getMotorsport, getTournaments
    , getTeam, getTournamentParticipating
    , getMotorsportType, searchData
    ,
} from '../config/db'

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send({
        message: "Hello, world."
    })
});

router.get('/car', async (req, res) => {
    const data = await getCar();
    console.log("GET CAR");
    res.send({
        data
    });
});

router.get('/matches', async (req, res) => {
    const data = await getTournaments();
    console.log("GET MATCHES");
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
    console.log("GET MATCH_PARTICIPATION");
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