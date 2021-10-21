const express = require('express');
const { cinemaRouters } = require('./cinema.routers');
const { userRouters } = require('./user.routers');
const { movieRouters } = require('./movie.routers');
const { ticketRouters } = require('./ticket.routers');
const rootRouter = express.Router();

rootRouter.use('/User', userRouters);
rootRouter.use('/Movie', movieRouters);
rootRouter.use('/Cinema', cinemaRouters);
rootRouter.use('/Ticket', ticketRouters);

module.exports = {
    rootRouter,
};