const { RESPONSE_CODE } = require('../constant/');
const ticketCtrl = require('../controllers/ticket.controller');
const validateTicket = require('../middlewares/ticket.middleware');
const auth = require('../middlewares/auth.middleware');

const express = require('express');

const ticketRouters = express.Router();

// 
ticketRouters.get('/ShowDetails', validateTicket.verifyShowtimeId, async (req, res) => {
    try {
        const id = req.query.showtimeid;

        let result = {};

        const showDetails = await ticketCtrl.getShowDetailsById(id);

        result['MovieInfo'] = showDetails;

        const seatDetails = await ticketCtrl.getListSeatByShowtimeId(id);

        result['ListSeat'] = seatDetails;

        res.status(RESPONSE_CODE.OK).send(result);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
})

module.exports = { ticketRouters };