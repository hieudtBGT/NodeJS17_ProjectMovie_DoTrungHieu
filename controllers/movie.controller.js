const { Movie, Sequelize } = require('../models');
const { paginate } = require('../helpers/paginate.helper');

const movieController = {
    getMovieList: (name = '') => {
        return Movie.findAll({
            where: Sequelize.where(Sequelize.col('name'), {
                [Sequelize.Op.like]: `%${name}%`
            }),
            attributes: ['id', 'name', 'startDate', 'time', 'evaluate', 'poster']
        });
    },

    getMovieListPaging: (name = '', { page, pageSize }) => {
        return Movie.findAndCountAll({
            where: Sequelize.where(Sequelize.col('name'), {
                [Sequelize.Op.like]: `%${name}%`,
            }),
            ...paginate({ page, pageSize })
        });
    },

    getMovieListPagingByDate: (name = '', from = '', to = '', { page, pageSize }) => {
        return Movie.findAndCountAll({
            where: {
                [Sequelize.Op.and]: [
                    Sequelize.where(Sequelize.col('name'), {
                        [Sequelize.Op.like]: `%${name}%`,
                    }),
                    Sequelize.where(Sequelize.col('startDate'), {
                        [Sequelize.Op.between]: [from, to],
                    })
                ]
            },
            ...paginate({ page, pageSize })
        });
    },

    getMovieByID: (id) => {
        return Movie.findByPk(id, {
            attributes: ['id', 'name', 'startDate', 'time', 'evaluate', 'poster']
        });
    },

    createMovie: (newMovie) => {
        return Movie.create(newMovie);
    },

    uploadPoster: (movieID, posterUrl) => {
        return Movie.update({ poster: posterUrl }, { where: { id: movieID } });
    },

    updateMovieByID: (movieID, newMovie) => {
        return Movie.update(newMovie, {
            where: { id: movieID }
        });
    },

    deleteMovieByID: (movieID) => {
        return Movie.destroy({
            where: { id: movieID }
        });
    },
};

module.exports = movieController;