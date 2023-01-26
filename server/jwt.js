const { sign, verify }  = require('jsonwebtoken');
const dotenv            = require('dotenv')

dotenv.config({ path: './config.env' })

const createTokens = (user) => {
    const accessToken = sign(
        {
            email   : user.email,
            name    : user.name,
        },
        process.env.SECRET_KEY
    );
    return accessToken;
}

const verifyTokens = (token) => {
    try {
        const decoded = verify(token, process.env.SECRET_KEY);
        return decoded;
    } catch (err) {
        res.status(400).send("Invalid token.");
    }
};


module.exports = { createTokens, verifyTokens };