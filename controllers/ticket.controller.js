const { Showtime, sequelize } = require('../models');

const ticketController = {
    getShowtimeByPk: (id) => {
        return Showtime.findByPk(id);
    },

    getShowDetailsById: (showtimeId) => {
        return sequelize.query(`
            SELECT st.id as ShowtimeId
                    , cnp.name as CineplexName
                    , cnm.name as CinemaName
                    , cnm.address as Address
                    , ms.name as MovieName
                    , ms.poster as Poster
                    , ms.startDate as DatetimeShow
                    , ms.time as Duration
            FROM projectmovie.showtimes st
                LEFT JOIN projectmovie.cinemas cnm on st.cinemaId = cnm.id
                LEFT JOIN projectmovie.cineplexes cnp on cnm.cineplexId = cnp.id
                LEFT JOIN projectmovie.cinemamovies cnmms on cnmms.cinemaId = cnm.id
                LEFT JOIN projectmovie.movies ms on cnmms.movieId = ms.id
            WHERE st.id = ${showtimeId}
        `,
            {
                type: sequelize.QueryTypes.SELECT, // to avoid duplicate result
                raw: true
            },
        )
    },

    getListSeatByShowtimeId: (showtimeId) => {
        return sequelize.query(`
            SELECT seat.id as SeatId
                    , seat.name as SeatName
                    , cnm.id as CinemaId
                    , seat.type as SeatType
                    , seat.price as SeatPrice
                    , seat.status as SeatStatus
            FROM projectmovie.seats seat
                LEFT JOIN projectmovie.showtimes sts on seat.showtimeId = sts.id
                LEFT JOIN projectmovie.cinemas cnm on sts.cinemaId = cnm.id
            WHERE sts.id = ${showtimeId};
        `,
            {
                type: sequelize.QueryTypes.SELECT, // to avoid duplicate result
                raw: true
            },
        )
    }
};

module.exports = ticketController;