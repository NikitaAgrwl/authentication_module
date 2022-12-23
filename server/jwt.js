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

const verifyTokens = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
    }
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(400).send("Invalid token.");
    }
};


module.exports = { createTokens, verifyTokens };
// const verifyTokens = (tokens) =>{
//     const decoded = verify(tokens,process.env.SECRET_KEY,function(err,decoded) {
//         if(err)
//         {
//             console.log('Error at JWT:\n',err)
//             return err;
//         }

//         return decoded
//     });

//     return decoded;
// }
