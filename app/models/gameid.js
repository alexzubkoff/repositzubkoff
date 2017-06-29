var mongoose = require('mongoose');

var gameIdSchema = mongoose.Schema({
        id       : []
        
});

module.exports = mongoose.model('GameId', gameIdSchema);