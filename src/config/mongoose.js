'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('hangman:config:mongoose');

mongoose.Promise = Promise;
if (!process.env.MONGODB_URL) {
    debug('MongoDB URL not found. Falling back to in-memory database...');
    require('mockgoose')(mongoose);
}

let db = mongoose.connection;
mongoose.connect(process.env.MONGODB_URL);
module.exports = new Promise(function(resolve, reject) {
    db.once('open', () => resolve(mongoose));
    db.on('error', reject);
});
