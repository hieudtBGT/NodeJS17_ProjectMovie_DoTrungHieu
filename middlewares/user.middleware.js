const { RESPONSE_CODE } = require('../constant');
const userCtrl = require('../controllers/user.controller');
const isEmail = require('isemail');

const validateUser = {
    verifyUserInfo: (addNew) => async (req, res, next) => {
        const { name, email, phone, password, role, avatar } = req.body;

        if (!isEmail.validate(email)) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `Email ${email} is incorrect format !` });
        }

        const userEmail = await userCtrl.getUserByEmail(email);
        if (addNew && userEmail) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `Email ${email} is taken. Try another !` });
        }

        if (!addNew && !userEmail) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `User email ${email} does not exist !` });
        }

        const phonePattern = new RegExp('^[0-9]{10}$');
        if (!phonePattern.test(phone)) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `Phone number ${phone} is not acceptable (Accept: 10 digits only)` });
        }

        const passwordPattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        if (!passwordPattern.test(password)) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `The password you entered doesn't meet minimum security requirements (Use 8 or more characters with a mix of letters, numbers & symbols)` });
        }

        const listRoles = ['ADMIN', 'STAFF', 'CUSTOMER'];
        if (!listRoles.includes(role.toString().toUpperCase())) {
            return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: `Role ${role} is invalid (Accept: ${listRoles})` });
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
}

module.exports = validateUser;