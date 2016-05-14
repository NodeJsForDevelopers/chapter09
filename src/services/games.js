'use strict';

const games = [];
let nextId = 1;

const asAsync = (callback, result) =>
                process.nextTick(() => callback(null, result));

class Game {
    constructor(id, setBy, word) {
        this.id = id;
        this.setBy = setBy;
        this.word = word.toUpperCase();
    }
    
    positionsOf(character) {
        let positions = [];
        for (let i in this.word) {
            if (this.word[i] === character.toUpperCase()) {
                positions.push(i);
            }
        }
        return positions;
    }
    
    remove(callback) {
        games.splice(games.indexOf(this), 1);
        asAsync(callback);
    }
}

module.exports.create = (userId, word, callback) => {
    const newGame = new Game(nextId++, userId, word); 
    games.push(newGame);
    asAsync(callback, newGame);
};

module.exports.get = (id, callback) =>
    asAsync(callback, games.find(game => game.id === parseInt(id, 10)));

module.exports.createdBy = (userId, callback) =>
    asAsync(callback, games.filter(game => game.setBy === userId));
    
module.exports.availableTo = (userId, callback) =>
    asAsync(callback, games.filter(game => game.setBy !== userId));

