const express       = require("express");
const app           = express();
const cors          = require('cors');
const mongoose      = require("mongoose");
const userDetails   = require('./models/userDetails');
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const dotenv        = require('dotenv');

const { createTokens, verifyTokens } = require('./jwt.js')
dotenv.config({ path: './config.env' });

// const mongoUrl = "mongodb+srv://nikita_ag:nikita231196@cluster0.xrwctcf.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

// Mongoose Connection
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to Database");
}).catch(e => console.log(e.message));

// Register user API
app.post("/api/user/register", async (req, res) => {
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await userDetails.create({
            name        : req.body.name,
            email       : req.body.email,
            password    : newPassword,
            userType    : req.body.userType,
        })
        res.status(201).send({
            reply       : 'Success'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            reply       : 'Internal Server Error',
            error
        })
    }
})

// Login user API
app.post("/api/user/login", async (req, res) => {
    console.log(req.body);
    try {
        // let projection = {_id:0, password:0};
        // let filter = {email: req.body.email};
        const user = await userDetails.findOne({
            email       : req.body.email,
        })
        const payload = {
            name        : user.name,
            email       : user.email,
            userType    : user.userType
        }
        console.log(user);
        if (user) {
            let check = await bcrypt.compare(req.body.password, user.password);
            if (!check) {
                return res.status(401).send({ reply: 'Unauthorized-User' })
            }

            // let token = createTokens(payload);

            return res.status(201).send({ reply: 'success', payload: payload })
        } else {
            return res.status(401).send({ reply: 'Unauthorized-User' })
        }
    } catch (error) {
        console.log("Login", error);
        return res.status(500).send({ reply: 'Internal Server Error' })
    }

})

// Update user API
app.post("/api/user/update", async (req, res) => {
    console.log(req.body);
    try {
        // let projection = {_id:0, password:0};
        let filter = { email: req.body.email };
        let updateDoc = {
            $set: {
                city    : req.body.city,
                contact : req.body.contact,
            }
        }
        const user = await userDetails.updateOne(filter, updateDoc);
        // console
        console.log("Backend Update User", user);
        if (user.modifiedCount) {
            return res.status(201).send({ reply: 'success'})
        }
    } catch (error) {
        console.log("Login", error);
        return res.status(500).send({ reply: 'Internal Server Error' })
    }

})

app.listen(process.env.PORT, () => {
    console.log("Server Started");
})