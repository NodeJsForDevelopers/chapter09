'use strict';

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/hangman');

const Schema = mongoose.Schema;
const gameSchema = new Schema({
    word: String,
    setBy: String
});

gameSchema.methods.positionsOf = function(character) {
    let positions = [];
    for (let i in this.word) {
        if (this.word[i] === character.toUpperCase()) {
            positions.push(i);
        }
    }
    return positions;
};

const Game = mongoose.model('Game', gameSchema);

module.exports.create = (userId, word) => {
    const game = new Game({setBy: userId, word: word.toUpperCase()});
    return game.save();
};
module.exports.createdBy =
    (userId) => Game.find({setBy: userId});
module.exports.availableTo =
    (userId) => Game.where('setBy').ne(userId);
module.exports.get =
    (id) => Game.findById(id);
