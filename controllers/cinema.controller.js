const { Cineplex, Showtime, Sequelize, sequelize } = require('../models');

const cineController = {
    getCineplexInfo: (name = '') => {
        return Cineplex.findAll({
            where: Sequelize.where(Sequelize.col('name'), {
                [Sequelize.Op.like]: `%${name}%`
            }),
            attributes: ['id', 'name', 'logo'],
            raw: true
        });
    },

    getGroupCinemaInfo: (cineplexName = '') => {
        return sequelize.query(`
            SELECT  cnm.id as CinemaId
                    , cnp.name as CineplexName
                    , cnm.name as CinemaName
                    , cnm.address
            FROM projectmovie.cineplexes cnp 
                LEFT JOIN projectmovie.cinemas cnm on cnm.cineplexId = cnp.id
            WHERE cnp.name LIKE '%${cineplexName}%';
            `,
            {
                type: sequelize.QueryTypes.SELECT, // to avoid duplicate result
                raw: true
            },
        )
    },

    getShowtimeByCinemaId: (cinemaId) => {
        return Showtime.findAll({
            where: { cinemaId },
            attributes: ['startTime'],
            raw: true
        })
    },

    getListMovieByCinemaId: (cinemaId) => {
        return sequelize.query(`
            SELECT cnmms.movieId as MovieId
                    , ms.name as MovieName
                    , ms.poster as Poster
            FROM projectmovie.movies ms
                LEFT JOIN projectmovie.cinemamovies cnmms on cnmms.movieId = ms.id
            WHERE cnmms.id = ${cinemaId};
            `,
            {
                type: sequelize.QueryTypes.SELECT, // to avoid duplicate result
                raw: true
            },
        )
    }
};

module.exports = cineController;