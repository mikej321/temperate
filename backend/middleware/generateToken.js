const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username
    }, process.env.SECRET_KEY, {
        expiresIn: '1h'
    })
}

module.exports = generateToken;