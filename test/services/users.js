'use strict';

const expect = require('chai').expect;
const service = require('../../src/services/users.js');

describe('User service', function() {
    describe('getUsername', function() { 
        it('should return a previously set username', done => {
            const userId = 'user-id-1';
            const name = 'User Name';
            service.setUsername(userId, name)
                .then(() => service.getUsername(userId))
                .then(actual => expect(actual).to.equal(name))
                .then(() => done(), done);
        });
        
        it('should return null if no username is set', done => {
            const userId = 'user-id-2';
            
            service.getUsername(userId)
                .then(name => expect(name).to.be.null)
                .then(() => done(), done);
        });
    });
});
