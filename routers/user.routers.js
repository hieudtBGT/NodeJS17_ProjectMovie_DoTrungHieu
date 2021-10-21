const { RESPONSE_CODE } = require('../constant/');
const validateUser = require('../middlewares/user.middleware');
const auth = require('../middlewares/auth.middleware');
const userCtrl = require('../controllers/user.controller');
const { generateToken } = require('../helpers/jwt.helpers');
const bcryptjs = require('bcryptjs');
const express = require('express');

const userRouters = express.Router();

// Get User Type List
userRouters.get('/TypeList', async (req, res) => {
    try {
        const typeList = await userCtrl.getUserTypeList();

        res.status(RESPONSE_CODE.OK).send(typeList);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

// User Sign In
userRouters.post('/SigIn', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email.trim() || !password.trim()) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: 'Email & Password are required' });
        }

        const user = await userCtrl.getUserByEmail(email);
        if (!user) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `Email ${email} does not exist` });
        }

        const isAuth = bcryptjs.compareSync(password, user.password);
        if (!isAuth) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: 'Wrong password' });
        }

        const token = generateToken(user);

        res.status(RESPONSE_CODE.OK).send({ user, token });
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

// User Sign Up
userRouters.post('/SignUp', validateUser.verifyUserInfo(true), async (req, res) => {
    try {
        const { name, email, phone, password, role, avatar } = req.body;

        const salt = bcryptjs.genSaltSync();
        const hashPassword = bcryptjs.hashSync(password, salt);

        const newUser = { name, email, phone, password: hashPassword, role: role.toUpperCase(), avatar };
        const user = await userCtrl.createUser(newUser);

        ['password', 'createdAt', 'updatedAt'].forEach(e => delete user['dataValues'][e]);

        res.status(RESPONSE_CODE.OK).send(user);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

// Get User List
userRouters.get('/UserList', async (req, res) => {
    try {
        const keyword = req.query.keyword;

        const userList = await userCtrl.getUserList(keyword);

        res.status(RESPONSE_CODE.OK).send(userList);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

// Get User List Paging
userRouters.get('/UserListPaging', validateUser.setDefaultPageValue, async (req, res) => {
    try {
        const keyword = req.query.keyword;

        const { page, pageSize } = req.pagevalue;

        const userListPaging = await userCtrl.getUserListPaging(keyword, { page, pageSize });

        const currentPage = page;
        const count = userListPaging['rows'].length;
        const totalCount = userListPaging['count'];
        const totalPages = Math.ceil(totalCount / pageSize);
        const items = userListPaging['rows'];
        const dataPaging = { currentPage, count, totalPages, totalCount, items }

        res.status(RESPONSE_CODE.OK).send(dataPaging);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

// Get User Info By Email
userRouters.get('/Info', auth.verifyToken, async (req, res) => {
    try {
        const { email } = req.body;
        if (email === undefined || email.length === 0) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: 'Empty email is not valid !' })
        }

        const userByEmail = await userCtrl.getUserByEmail(email);

        if (!userByEmail) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `User email ${email} does not exist !` });
        }

        userByEmail['dataValues']['TicketInfo'] = []

        res.status(RESPONSE_CODE.OK).send(userByEmail);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

// Admin Add New User
userRouters.post('/AddNewUser', auth.verifyToken, auth.authorize('ADMIN'), validateUser.verifyUserInfo(true), async (req, res) => {
    try {
        const { name, email, phone, password, role, avatar } = req.body;

        const salt = bcryptjs.genSaltSync();
        const hashPassword = bcryptjs.hashSync(password, salt);

        const newUser = { name, email, phone, password: hashPassword, role: role.toUpperCase(), avatar };
        const user = await userCtrl.createUser(newUser);

        ['password', 'createdAt', 'updatedAt'].forEach(e => delete user['dataValues'][e]);

        res.status(RESPONSE_CODE.OK).send(user);
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

// Update User By Email
userRouters.patch('/Info/Update', auth.verifyToken, validateUser.verifyUserInfo(false), async (req, res) => {
    try {
        const { name, email, phone, password, role, avatar } = req.body;

        const salt = bcryptjs.genSaltSync();
        const hashPassword = bcryptjs.hashSync(password, salt);

        const newUser = { name, email, phone, password: hashPassword, role: role.toUpperCase(), avatar };
        await userCtrl.updateUserByEmail(email, newUser)

        res.status(RESPONSE_CODE.OK).send({ message: `User email ${email} has been updated` });
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

// Admin Remove User By Email
userRouters.delete('/RemoveUser', auth.verifyToken, auth.authorize('ADMIN'), async (req, res) => {
    try {
        const email = req.query.email;
        if (email === undefined || email.length === 0) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: 'Empty email is not valid !' })
        }

        const userByEmail = await userCtrl.getUserByEmail(email);

        if (!userByEmail) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `User email ${email} does not exist !` });
        }

        await userCtrl.deleteUserByEmail(email);
        res.status(RESPONSE_CODE.OK).send({ message: `User with email ${email} has been deleted` });
    } catch (error) {
        res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

module.exports = { userRouters };