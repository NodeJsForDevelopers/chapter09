'use strict';

var express = require('express');
var router = express.Router();
var games = require('../services/games');

/* GET home page. */
router.get('/', function(req, res, next) {
    games.createdBy(req.user.id)
        .then(gamesCreatedByUser => 
            games.availableTo(req.user.id)
                .then(gamesAvailableToUser => {
                res.render('index', {
                        title: 'Hangman',
                        userId: req.user.id,
                        createdGames: gamesCreatedByUser,
                        availableGames: gamesAvailableToUser,
                        partials: { createdGame: 'createdGame' }
                    });
                }))
        .catch(next);
});

module.exports = router;
