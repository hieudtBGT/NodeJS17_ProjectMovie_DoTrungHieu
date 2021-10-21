const { RESPONSE_CODE } = require('../constant/');
const date = require('date-and-time');
const validateMovie = require('../middlewares/movie.middleware');
const auth = require('../middlewares/auth.middleware');
const uploadImage = require('../middlewares/image.middleware');
const movieCtrl = require('../controllers/movie.controller');
const express = require('express');

const movieRouters = express.Router();

const config = require('../config/config.json')['development'];

// Get Movie List
movieRouters.get('/MovieList', async (req, res) => {
    try {
        const keyword = req.query.name;
        const movieList = await movieCtrl.getMovieList(keyword);

        res.status(RESPONSE_CODE.OK).send(movieList);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

// Get Movie List Paging
movieRouters.get('/MovieListPaging', validateMovie.setDefaultPageValue, async (req, res) => {
    try {
        const name = req.query.name;

        const { page, pageSize } = req.pagevalue;

        const movieListPaging = await movieCtrl.getMovieListPaging(name, { page, pageSize });

        const currentPage = page;
        const count = movieListPaging['rows'].length;
        const totalCount = movieListPaging['count'];
        const totalPages = Math.ceil(totalCount / pageSize);
        const items = movieListPaging['rows'];
        const dataPaging = { currentPage, count, totalPages, totalCount, items }

        res.status(RESPONSE_CODE.OK).send(dataPaging);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

// Get Movie List Paging By Date
movieRouters.get('/MovieListPagingByDate', validateMovie.setDefaultPageValue, validateMovie.verifyDateFormat, async (req, res) => {
    try {
        const name = req.query.name;

        const { page, pageSize } = req.pagevalue;
        const { from, to } = req.date;

        const movieListPaging = await movieCtrl.getMovieListPagingByDate(name, from, to, { page, pageSize });

        const currentPage = page;
        const count = movieListPaging['rows'].length;
        const totalCount = movieListPaging['count'];
        const totalPages = Math.ceil(totalCount / pageSize);
        const items = movieListPaging['rows'];
        const dataPaging = { currentPage, count, totalPages, totalCount, items }

        res.status(RESPONSE_CODE.OK).send(dataPaging);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

// Add New Movie
movieRouters.post('/AddNewMovie', auth.verifyToken, auth.authorize('ADMIN', 'STAFF'), validateMovie.verifyMovieInfo(true), async (req, res) => {
    try {
        const { id, name, startDate, time, evaluate, poster, trailer } = req.body;

        const newMovie = { id, name, startDate, time, evaluate, poster, trailer };
        const movie = await movieCtrl.createMovie(newMovie);

        const dateObj = movie['dataValues']['startDate'];
        const dateFormat = date.format(dateObj, 'YYYY-MM-DD HH:mm:ss');
        movie['dataValues']['startDate'] = dateFormat;

        ['createdAt', 'updatedAt'].forEach(e => delete movie['dataValues'][e]);

        res.status(RESPONSE_CODE.OK).send(movie);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

// (Admin, Staff) Update Movie Poster
movieRouters.post('/UpdateMoviePoster', auth.verifyToken, auth.authorize('ADMIN', 'STAFF'), validateMovie.verifyMovieID, uploadImage.moviePoster(), async (req, res) => {
    try {
        const id = Number(req.query.id);

        const { file } = req;

        file.path = file.path.replace(/\\/g, '/');

        const posterUrl = `http://localhost:${config.serverPort}/` + file.path;

        await movieCtrl.uploadPoster(id, posterUrl);

        res.status(RESPONSE_CODE.OK).send({ message: `Update movie poster for id ${id} succeed`, url: posterUrl });
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
})

// (Admin, Staff) Update Movie
movieRouters.post('/UpdateMovie', auth.verifyToken, auth.authorize('ADMIN', 'STAFF'), validateMovie.verifyMovieInfo(false), async (req, res) => {
    try {
        const { id, name, startDate, time, evaluate, poster, trailer } = req.body;

        const newMovie = { id, name, startDate, time, evaluate, poster, trailer };

        await movieCtrl.updateMovieByID(id, newMovie);

        res.status(RESPONSE_CODE.OK).send({ message: `Movie id ${id} has been updated` });
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
})

// Admin Delete Movie By ID
movieRouters.delete('/Delete', auth.verifyToken, auth.authorize('ADMIN'), validateMovie.verifyMovieID, async (req, res) => {
    try {
        const id = req.query.id;

        await movieCtrl.deleteMovieByID(id);

        res.status(RESPONSE_CODE.OK).send({ message: `Movie id ${id} has been deleted` });
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
})

module.exports = { movieRouters };