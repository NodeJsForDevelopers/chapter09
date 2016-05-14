'use strict';

module.exports = (gamesService) => {
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res, next) {
        Promise.all([
            gamesService.createdBy(req.user.id),
            gamesService.availableTo(req.user.id)
        ])
            .then(results => {
                res.render('index', {
                            title: 'Hangman',
                            userId: req.user.id,
                            createdGames: results[0],
                            availableGames: results[1],
                            partials: { createdGame: 'createdGame' }
                        });
                })
            .catch(next);
    });

    return router;
};
