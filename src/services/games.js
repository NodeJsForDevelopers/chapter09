'use strict';

const games = [];
let nextId = 1;

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
    
    remove() {
        games.splice(games.indexOf(this), 1);
        return Promise.resolve();
    }
}

module.exports.create = (userId, word) => {
    const newGame = new Game(nextId++, userId, word); 
    games.push(newGame);
    return Promise.resolve(newGame);
};

module.exports.get = (id) =>
    Promise.resolve(games.find(game => game.id === parseInt(id, 10)));
    
module.exports.createdBy = (userId) =>
    Promise.resolve(games.filter(game => game.setBy === userId));
    
module.exports.availableTo = (userId) =>
    Promise.resolve(games.filter(game => game.setBy !== userId));
