'use strict';

const expect = require('chai').expect;
const service = require('../../src/services/games.js');

describe('Game service', () => {
    const firstUserId = 'user-id-1';
    const secondUserId = 'user-id-2';
    
    beforeEach(function(done) {
        service.availableTo('not-a-user', (err, gamesAdded) => {
            let gamesDeleted = 0;
            if (gamesAdded.length === 0) {
                done();
            }
            gamesAdded.forEach(game => {
                game.remove(() => {
                    if (++gamesDeleted === gamesAdded.length) {
                        done();
                    }
                });
            });
        });
    });

    describe('list of available games', () => { 
        it('should include games set by other users', done => {
            // Given
            service.create(firstUserId, 'testing', () => {
                // When
                service.availableTo(secondUserId, (err, games) => {
                    // Then
                    expect(games.length).to.equal(1);
                    const game = games[0];
                    expect(game.setBy).to.equal(firstUserId);
                    expect(game.word).to.equal('TESTING');
                    done();
                });
            });
        });
        
        it('should not include games set by the same user', done => {
            // Given
            service.create(firstUserId, 'first', () => {
                service.create(secondUserId, 'second', () => {
                    //When
                    service.availableTo(secondUserId, (err, games) => {
                        // Then
                        expect(games.length).to.equal(1);
                        const game = games[0];
                        expect(game.setBy).not.to.equal(secondUserId);
                        done();
                    });
                });
            });
        });
    });
});
