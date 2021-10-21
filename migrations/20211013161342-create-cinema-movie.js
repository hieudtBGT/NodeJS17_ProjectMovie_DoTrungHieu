'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CinemaMovies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cinemaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cinemas',
          key: 'id'
        }
      },
      movieId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'movies',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CinemaMovies');
  }
};