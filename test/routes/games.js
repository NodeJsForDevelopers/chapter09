'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const expect = require('chai').expect;
const gamesService = require('../../src/services/games.js');

const userId = 'test-user-id';

describe('/games', () => {
    let agent, app;
    
    before(() => {
        app = express();
        app.use(bodyParser.json());
        app.use((req, res, next) => { req.user = { id: userId }; next(); });
        
        const games = require('../../src/routes/games.js');
        app.use('/games', games);
    });
    
    beforeEach(() => {
        agent = request.agent(app);
    });
    
    describe('/:id DELETE', () => {
        it('should allow users to delete their own games', done => {
            gamesService.create(userId, 'test')
                .then(game => {
                    agent
                        .delete('/games/' + game.id)
                        .expect(200)
                        .end(function(err) {
                            if (err) {
                                done(err);
                            } else {
                                gamesService.createdBy(userId)
                                    .then(createdGames => { expect(createdGames).to.be.empty; })
                                    .then(done, done);
                            }
                        });
                });
        });
        
        it('should not allow users to delete games that they did not set', done => {
            gamesService.create('another-user-id', 'test')
                .then(game => {
                    agent
                        .delete('/games/' + game.id)
                        .expect(403)
                        .end(function(err) {
                            if (err) {
                                done(err);
                            } else {
                                gamesService.get(game.id)
                                    .then(createdGame => { expect(createdGame).ok; })
                                    .then(done, done);
                            }
                        });
                });
        });

        it('should return a 404 for requests to delete a game that no longer exists', done => {
            gamesService.create(userId, 'test')
                .then(game => {
                    agent
                        .delete(`/games/${game.id}`)
                        .expect(200)
                        .end(function(err) {
                            if (err) {
                                done(err);
                            } else {
                                agent
                                    .delete('/games/' + game.id)
                                    .expect(404, done);
                            }
                        });
                });
        });
    });
});
