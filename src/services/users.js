'use strict';

let redisClient = require('../config/redis.js');

module.exports = {
    getUsername: userId =>
        redisClient.getAsync(`user:${userId}:name`),
    setUsername: (userId, name) =>
        redisClient.setAsync(`user:${userId}:name`, name),
    recordWin: userId =>
        redisClient.zincrbyAsync('user:wins', 1, userId),
    getTopPlayers: () =>
        redisClient.zrevrangeAsync('user:wins', 0, 2, 'withscores')
        .then(interleaved => {
            if (interleaved.length === 0) {
                return [];
            }
            let userIds = interleaved
                .filter((user, index) => index % 2 === 0)
                .map((userId) => `user:${userId}:name`);
            return redisClient.mgetAsync(userIds)
                .then(names => names.map((username, index) => ({
                    name: username,
                    userId: interleaved[index * 2],
                    wins: parseInt(interleaved[index * 2 + 1], 10)
                })));
        }),
    getRanking: userId => {
        return Promise.all([
            redisClient.zrevrankAsync('user:wins', userId),
            redisClient.zscoreAsync('user:wins', userId)
        ]).then(out => {
            if (out[0] === null) {
                return null;
            }
            return { rank: out[0] + 1, wins: parseInt(out[1], 10) };
        });
    }
};
