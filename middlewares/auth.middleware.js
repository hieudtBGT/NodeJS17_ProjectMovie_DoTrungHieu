const { RESPONSE_CODE } = require('../constant');
const jwt = require('jsonwebtoken');

const authenticate = {
    verifyToken: (req, res, next) => {
        try {
            const token = req.header('movie_token');
            const secretKey = 'Nodejs-17';
            const decode = jwt.verify(token, secretKey);

            const { id, email, role } = decode;

            req.user = { id, email, role };

            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(RESPONSE_CODE.FORBIDDEN).send({ message: 'Token is expired' });
            }
            res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: 'Invalid token' });
        }
    },

    authorize: (...arrRole) => (req, res, next) => {
        const { id, email, role } = req.user;

        const index = arrRole.findIndex(_role => _role === role);

        if (index === -1) {
            return res.status(RESPONSE_CODE.FORBIDDEN).send({ message: "You don't have permission !" });
        }

        next();
    }
};

module.exports = authenticate;
