const mongoose = require('mongoose');
const dotenv = require('dotenv')
let db = mongoose.connection;

dotenv.config({ path: './config.env' })

const DBConnection = process.env.DB_CONNECTION;

function init() {
    return new Promise((resolve, reject) => {
        // mongoose.set('debug', true); // enable to show the mongo queries fired
        mongoose.connect(DBConnection,
            {
                autoIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            db.on('error', (err) => {
                console.log('Connection with mongodb failed', { err });
                return reject(err);
            });

            db.once('open', () => {
                console.log('Connection with mongodb successfully established.');
                return resolve();
            });

            db.on('connected', function () {
                console.log('Connect to mongodb ok');
            });

            db.on('disconnected', function () {
                console.log('Disconnected from mongodb.');
            });
        })
    }

module.exports = {init};