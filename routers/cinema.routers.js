const { RESPONSE_CODE } = require('../constant/');
const cineCtrl = require('../controllers/cinema.controller');

const express = require('express');

const cinemaRouters = express.Router();

// Get Cineplex Info
cinemaRouters.get('/CineplexInfo', async (req, res) => {
    try {
        const name = req.query.name;
        const cineplexList = await cineCtrl.getCineplexInfo(name);

        res.status(RESPONSE_CODE.OK).send(cineplexList);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
})

// Get Cinema Group Info
cinemaRouters.get('/CinemaGroupInfo', async (req, res) => {
    try {
        const cineplexName = req.query.cineplexname;
        const cinemaGroup = await cineCtrl.getGroupCinemaInfo(cineplexName);

        for (let cinema of cinemaGroup) {
            const cinemaId = cinema['CinemaId'];
            const showtime = await cineCtrl.getShowtimeByCinemaId(cinemaId);

            cinema['ShowTimes'] = showtime;
        }

        res.status(RESPONSE_CODE.OK).send(cinemaGroup);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
})

// Get Cineplex Showcase
cinemaRouters.get('/CineplexShowcase', async (req, res) => {
    try {
        const cineplexName = req.query.cineplexname;
        const cineplexList = await cineCtrl.getCineplexInfo(cineplexName);

        for (let cineplex of cineplexList) {
            const cinemaGroup = await cineCtrl.getGroupCinemaInfo(cineplex['name']);

            for (let cinema of cinemaGroup) {
                const listMovie = await cineCtrl.getListMovieByCinemaId(cinema['CinemaId']);

                cinema['ListMovie'] = listMovie;
            }

            cineplex['ListGroupCinema'] = cinemaGroup;
        }

        res.status(RESPONSE_CODE.OK).send(cineplexList);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
})

module.exports = { cinemaRouters };