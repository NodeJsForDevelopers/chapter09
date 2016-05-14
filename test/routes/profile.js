'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const expect = require('chai').expect;

const userId = 'test-user-id';

describe('/profile', function() {
    let agent, app, usersService;
    
    before(() => {
        app = express();
        app.use(bodyParser.json());
        app.use((req, res, next) => { req.user = { id: userId }; next(); });
        
        usersService = require('../../src/services/users.js');
        const profile = require('../../src/routes/profile.js')(usersService);
        app.use('/profile', profile);
    });
    
    beforeEach(() => {
        agent = request.agent(app);
    });
    
    describe('/profile POST', function() {
        it('should set the name of the current user', function(done) {
            agent
                .post('/profile')
                .send({ name: 'User Name' })
                .expect(302)
                .expect('Location', '/')
                .end(function(error) {
                    if (error) {
                        done(error);
                    } else {
                        usersService.getUsername(userId)
                            .then(setName => { expect(setName).to.equal('User Name'); })
                            .then(done, done);
                    }
                });
        });
    });
    
});