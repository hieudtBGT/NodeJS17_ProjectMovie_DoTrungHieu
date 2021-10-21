const { User, Sequelize } = require('../models');
const { paginate } = require('../helpers/paginate.helper')

const userController = {
    getUserList: (keyword = '') => {
        return User.findAll({
            where: Sequelize.where(
                Sequelize.fn('CONCAT'
                    , Sequelize.col('name'), " "
                    , Sequelize.col('email'), " "
                    , Sequelize.col('phone')
                ),
                {
                    [Sequelize.Op.like]: `%${keyword}%`,
                }
            ),
            attributes: ['id', 'name', 'email', 'phone', 'role', 'avatar', 'createdAt', 'updatedAt']
        });
    },

    getUserListPaging: (keyword = '', { page, pageSize }) => {
        return User.findAndCountAll({
            where: Sequelize.where(
                Sequelize.fn('CONCAT'
                    , Sequelize.col('name'), " "
                    , Sequelize.col('email'), " "
                    , Sequelize.col('phone')
                ),
                {
                    [Sequelize.Op.like]: `%${keyword}%`,
                }
            ),
            attributes: ['id', 'name', 'email', 'phone', 'role', 'avatar', 'createdAt', 'updatedAt'],
            ...paginate({ page, pageSize })
        })
    },

    getUserTypeList: () => {
        return User.findAll({
            attributes: ['role'],
            group: ['role']
        });
    },

    getUserByEmail: (email) => {
        return User.findOne({
            where: { email },
            attributes: ['id', 'name', 'email', 'phone', 'password', 'role', 'avatar']
        });
    },

    createUser: (newUser) => {
        return User.create(newUser);
    },

    deleteUserByEmail: (email) => {
        return User.destroy({
            where: { email }
        });
    },

    updateUserByEmail: (userEmail, newUser) => {
        return User.update(newUser, {
            where: { email: userEmail }
        });
    }
}

module.exports = userController;