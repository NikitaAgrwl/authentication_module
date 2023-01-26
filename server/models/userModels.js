const userSchema = require('../schema/userDetails');
const mongo = {};

mongo.create = async (data) => {
    let response = await userSchema.create(data);
    return response;
}

mongo.retreive = async (filter = {}, projection = {}) => {
    let response = await userSchema.findOne(filter, projection);
    return response;
}

mongo.update = async (filter, data) => {
    let response = await userSchema.findOneAndUpdate(filter, {$set: {...data}});
    return response;
}

mongo.delete = async (filter) => {
    let response = await userSchema.findOneAndDelete(filter);
    return response;
}

module.exports = mongo;