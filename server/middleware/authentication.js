const { verifyTokens } = require('../jwt')

const auth = (req, res, next) => {
    try {
        const token = req.header("authorization");
        if (!token) {
            return res.status(401).send("Access denied. No token provided.");
        }

        const data  = verifyTokens(token);
        req.user    = data; 
        next();
    } catch (error) {
        return res.status(401).send({reply: 'Unauthorized User'});
    }
}

module.exports = auth;