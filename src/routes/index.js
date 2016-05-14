'use strict';

var express = require('express');
var router = express.Router();
var games = require('../services/games');

/* GET home page. */
router.get('/', function(req, res, next) {
    games.createdBy(req.user.id, (err, createdGames) => {
        if (err) {
            next(err);
        } else {
            games.availableTo(req.user.id, (err, availableGames) => {
                if (err) {
                    next(err);
                } else {
                    res.render('index', {
                        title: 'Hangman',
                        userId: req.user.id,
                        createdGames: createdGames,
                        availableGames: availableGames,
                        partials: { createdGame: 'createdGame' }
                    });
                }
            });
        }
    });
});

module.exports = router;
