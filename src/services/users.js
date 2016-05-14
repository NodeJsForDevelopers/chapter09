'use strict';

let redisClient = require('../config/redis.js');

module.exports = {
    getUsername: userId =>
        redisClient.getAsync(`user:${userId}:name`),
    setUsername: (userId, name) =>
        redisClient.setAsync(`user:${userId}:name`, name)
};
