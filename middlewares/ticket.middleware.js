const { RESPONSE_CODE } = require('../constant');
const ticketCtrl = require('../controllers/ticket.controller');

const validateTicket = {
    verifyShowtimeId: async (req, res, next) => {
        const id = req.query.showtimeid;

        if (typeof id === 'undefined' || id === '') {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: 'Showtime ID is required !' });
        }

        if (isNaN(id)) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: 'Showtime ID must be a number !' });
        }

        const showtime = await ticketCtrl.getShowtimeByPk(id);
        if (!showtime) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `Showtime with id ${id} does not exist !` });
        }

        next();
    }
};

module.exports = validateTicket;