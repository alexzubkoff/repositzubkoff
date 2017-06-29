var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
		game_id        : Number,
        player_1id             : {
        	id             : String,
        	player_cards   : [],
        	player_vic     : 0,
        	player_loose   : 0,
        	player_vic_sum : 0,
        	player_loose_sum:0
        },
        player_2id             : {
        	id 	       : String,
        	player_cards   : [],
        	player_vic     : 0,
        	player_loose   : 0,
        	player_vic_sum : 0,
        	player_loose_sum:0
        },
        cards        : [],
        games_amount : 0      
        
});

module.exports = mongoose.model('Game', gameSchema);