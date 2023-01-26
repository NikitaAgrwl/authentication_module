const bcrypt                        = require('bcrypt');
const { createTokens }              = require('../jwt')
const userModel                     = require('../models/userModels');

const user = {};

user.login = async (req, res) => {
    try {
        // let projection = {_id:0, password:0};
        let filter = {email : req.body.email};
        const user = await userModel.retreive(filter);
        if (user) {
            let check = await bcrypt.compare(req.body.password, user.password);
            if (!check) {
                return res.status(401).send({ reply: 'Unauthorized-User' })
            }
            const accessToken = createTokens(user);
            
            res.cookie('authorization', accessToken, { httpOnly: true })
            const payload = {
                name        : user.name,
                email       : user.email,
                userType    : user.userType
            }
            return res.status(201).send({ reply: 'success', payload: payload })
        } else {
            return res.status(401).send({ reply: 'Unauthorized-User' })
        }
    } catch (error) {
        console.log("Login", error);
        return res.status(500).send({ reply: 'Internal Server Error' })
    }

}


user.register = async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        const data = {
            name        : req.body.name,
            email       : req.body.email,
            password    : newPassword,
            userType    : req.body.userType,
        }

        let doc = await userModel.create(data);
        
        if(doc)
            res.status(201).send({reply : 'Success'})

    } catch (error) {
        console.log(error);
        res.status(500).send({
            reply       : 'Internal Server Error',
            error
        })
    }
}

user.update = async (req, res) => {
    try {
        // let projection = {_id:0, password:0};
        let data = req.body;
        let filter = { email: data.email };
        let updateDoc = {
                city    : data?.city,
                contact : data?.contact,
        }
        const user = await userModel.update(filter, updateDoc);

        if (user) {
            return res.status(201).send({ reply: 'success'})
        } else {
            console.log('User Not Found');
            return res.status(403).send({ reply: 'fail'})
        }
    } catch (error) {
        console.log("Login Error", error);
        return res.status(500).send({ reply: 'Internal Server Error' })
    }

}

user.delete = () => {

}

module.exports = user;