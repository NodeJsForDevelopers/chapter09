'use strict';

const bluebird = require('bluebird');
const debug = require('debug')('hangman:config:redis');

if (process.env.REDIS_URL) {
    let redis = require('redis');
    bluebird.promisifyAll(redis.RedisClient.prototype);
    module.exports = redis.createClient(process.env.REDIS_URL);
} else {
    debug('Redis URL not found. Falling back to mock DB...');
    let redisClient = require('redis-js');
    bluebird.promisifyAll(redisClient);
    module.exports = redisClient;
}
