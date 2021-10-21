const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    }

    const secretKey = 'Nodejs-17'

    const token = jwt.sign(payload, secretKey, {
        expiresIn: '1d'
    })

    return token
}

module.exports = {
    generateToken
}