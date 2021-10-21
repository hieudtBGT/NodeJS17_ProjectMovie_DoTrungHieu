const { RESPONSE_CODE } = require('../constant');
const movieCtrl = require('../controllers/movie.controller');
const date = require('date-and-time');

const validateMovie = {
    verifyMovieInfo: (addNew) => async (req, res, next) => {
        const { id, name, startDate, time, evaluate, poster, trailer } = req.body;

        if (isNaN(id) || isNaN(time) || isNaN(evaluate)) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: 'Id, time and evaluate must be a number !' });
        }

        const dateParsed = date.parse(startDate, 'YYYY-MM-DD HH:mm:ss');
        if (isNaN(dateParsed)) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: 'Incorrect date format (startDate: YYYY-MM-DD HH:mm:ss)' })
        }

        const movie = await movieCtrl.getMovieByID(id);
        if (addNew && movie) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `Movie with id ${id} has already exists !` });
        }

        if (!addNew && !movie) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `Movie with id ${id} does not exist !` });
        }

        next();
    },

    setDefaultPageValue: (req, res, next) => {
        let page = req.query.page;
        let pageSize = req.query.pageSize;

        page = (typeof page === 'undefined' || page === '') ? 0 : Number(page);
        pageSize = (typeof pageSize === 'undefined' || pageSize === '') ? 10 : Number(pageSize);

        req.pagevalue = { page, pageSize };

        next();
    },

    verifyDateFormat: (req, res, next) => {
        let from = req.query.from;
        let to = req.query.to;

        const formatClientSide = 'DD/MM/YYYY';
        const formatServerSide = 'YYYYMMDD';
        const now = new Date();

        if (typeof from === 'undefined' || from === '') {
            from = date.format(now, formatClientSide);
        }

        if (typeof to === 'undefined' || to === '') {
            to = date.format(now, formatClientSide);
        }

        const dateFrom = date.parse(from, formatClientSide);
        if (isNaN(dateFrom)) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `Date From is incorrect format (Accept: ${formatClientSide})` });
        }
        else {
            from = date.format(dateFrom, formatServerSide);
        }

        const dateTo = date.parse(to, formatClientSide);
        if (isNaN(dateTo)) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `Date To is incorrect format (Accept: ${formatClientSide})` });
        }
        else {
            to = date.format(dateTo, formatServerSide);
        }

        req.date = { from, to };
        next();
    },

    verifyMovieID: async (req, res, next) => {
        const id = req.query.id;

        if (typeof id === 'undefined' || id === '') {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: 'Movie ID is required !' });
        }

        if (isNaN(id)) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: 'ID must be a number !' });
        }

        const movie = await movieCtrl.getMovieByID(id);
        if (!movie) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `Movie with id ${id} does not exist !` });
        }

        next();
    }
};

module.exports = validateMovie