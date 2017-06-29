// app/game.js
module.exports = function(app, passport,io) {

var Game       = require('../app/models/gamestat');
var  players_id=require('./routes.js');

/*var game_id=1;*/
var player1id_vic=0;
var player2id_vic=0;
var player1id_loose=0;
var player2id_loose=0;
var player1id_vic_sum=0;
var player2id_vic_sum=0;
var player1id_loose_sum=0;
var player2id_loose_sum=0;

    var cards=["buba_2","buba_3","buba_4","buba_5","buba_6",
           "buba_7","buba_8","buba_9","buba_10","buba_A",
           "buba_J","buba_K","buba_Q","cherv_2","cherv_3",
           "cherv_4","cherv_5","cherv_7","cherv_8","cherv_9",
           "cherv_10","cherv_A","cherv_J","cherv_K","cherv_Q",
           "krest_2","krest_3","krest_4","krest_5","krest_6",
           "krest_7","krest_8","krest_10","krest_A","krest_J",
           "krest_K","krest_Q","pika_2","pika_3","pika_4",
           "pika_5","pika_6","pika_7","pika_8","pika_9",
           "pika_10","pika_A","pika_J","pika_K","pika_Q"];

    var cardsweight={"buba_2":2,"buba_3":3,"buba_4":4,"buba_5":5,"buba_6":6,
           "buba_7":7,"buba_8":8,"buba_9":9,"buba_10":10,"buba_A":11,
           "buba_J":10,"buba_K":10,"buba_Q":10,"cherv_2":2,"cherv_3":3,
           "cherv_4":4,"cherv_5":5,"cherv_7":7,"cherv_8":8,"cherv_9":9,
           "cherv_10":10,"cherv_A":11,"cherv_J":10,"cherv_K":10,"cherv_Q":10,
           "krest_2":2,"krest_3":3,"krest_4":4,"krest_5":5,"krest_6":6,
           "krest_7":7,"krest_8":8,"krest_10":10,"krest_A":11,"krest_J":10,
           "krest_K":10,"krest_Q":10,"pika_2":2,"pika_3":3,"pika_4":4,
           "pika_5":5,"pika_6":6,"pika_7":7,"pika_8":8,"pika_9":9,
           "pika_10":10,"pika_A":11,"pika_J":10,"pika_K":10,"pika_Q":10};          

var player1id;
var player2id;
var cardsplayer1=[];
var cardsplayer2=[];
var cardsamount=50;
var stakeplayer1={sum:0};
var stakeplayer2={sum:0};
var pointsplayer1=0;
var pointsplayer2=0;
var sumbank=0;
var bank=0;
var sumplayer1={result:0};
var sumplayer2={result:0};

io.on('connection', function(socket){
    
    console.log("connected!");   

    socket.on('chat', function(msg){
        
        io.emit('chat', msg);
        
    });
    

    socket.on("oponcardsdistrib", function(msg){

         socket.broadcast.emit('oponcardsdistrib', msg);
    });

    socket.on("oponcardstake", function(msg){
        
        socket.broadcast.emit('oponcardstake', msg);
        
        
    });

    socket.on("oponcardsopen", function(msg){
    /*socket.broadcast.emit('oponcardsopenmsg',{mes:"Соперник открывает карты!"});*/
    io.to(socket.id).emit('oponcardsopen', msg);
    
    });

    socket.on('doingstake', function(msg){
        io.emit('doingstake', msg);
        
    });

    socket.on('zerosum', function(msg){     
    io.emit('zerosum', msg);
    });

    socket.on('sumresultplayer1', function(msg){    
    console.log(sumplayer1.result);   
    io.to(socket.id).emit('sumresultplayer1',sumplayer1.result);
    });

    socket.on('sumresultplayer2', function(msg){
    console.log(sumplayer2.result);       
    io.to(socket.id).emit('sumresultplayer2',sumplayer2.result);
    });


    socket.on('savegame', function(msg){      
    socket.broadcast.emit('savegame',msg);

    var game = new Game();
    game.game_id=1;
    game.save();

    Game.findOne({game_id:1},
        function (err,games){
            
        });

    /*game.game_id=game_id;
    game.player_1id.id=player1id;
    game.player_1id.player_cards=cardsplayer1;
    game.player_1id.player_vic=player1id_vic;
    game.player_1id.player_loose =player1id_loose;
    game.player_1id.player_vic_sum=sumplayer1.result;
    game.player_1id.player_loose_sum=player1id_loose_sum;

    game.player_2id.id=player2id;
    game.player_2id.player_cards=cardsplayer2;
    game.player_2id.player_vic=player2id_vic;
    game.player_2id.player_loose =player2id_loose;
    game.player_2id.player_vic_sum=sumplayer2.result;
    game.player_2id.player_loose_sum=player2id_loose_sum;

    game.cards= cards;
    game.games_amount=game_id;*/

    /*games.save();
    console.log(games);*/

    });


    socket.on('exitgame', function(msg){      
    socket.broadcast.emit('exitgame',msg);
    });

    socket.on('disconnect', function(){
        console.log("disconnect");
    });

});

    app.get('/cardsdistrib',function(req, res) {
        player1id=players_id.player1_id;
        console.log(player1id);
        player2id=players_id.player2_id;
        console.log(player2id);
        switch (req.session.passport.user){ 
               case (player1id):                    
        if ((cardsamount!=0)&&(cardsplayer1[0]===undefined)){
            var pos1=Math.floor(Math.random()*cardsamount+1);
            var pos2=Math.floor(Math.random()*cardsamount+1);
            cardsplayer1[0]=cards[pos1];
            cardsplayer1[1]=cards[pos2];
            res.send(cardsplayer1); 
            cardsamount-=2; 
            cards.splice(pos1,1);
            cards.splice(pos2,1);
            
        }else {
            res.send("Вы уже взяли 2 карты!");
        }

           break;
    
             case (player2id):
            if ((cardsamount!=0)&&(cardsplayer2[0]===undefined)){
            var pos1=Math.floor(Math.random()*cardsamount+1);
            var pos2=Math.floor(Math.random()*cardsamount+1);
            cardsplayer2[0]=cards[pos1];
            cardsplayer2[1]=cards[pos2];
            res.send(cardsplayer2); 
            cardsamount-=2; 
            cards.splice(pos1,1);
            cards.splice(pos2,1);
            
        }else {
            res.send("Вы уже взяли 2 карты!");
        }

            default:
            break;

        }
        
            
    });
    var i=2;

    app.get('/takecard', function(req, res) {
        if (req.session.passport.user===player1id){

        if ((cardsamount!=0)&&(cardsplayer1.length<5)){
            var pos3=Math.floor(Math.random()*cardsamount+1);
            cardsplayer1[i]=cards[pos3];
            res.send(cardsplayer1); 
            i+=1;
            console.log(cardsplayer1);
            cardsamount-=1; 
            cards.splice(pos3,1);
            //console.log(cards);
        }else {
            res.send("В вашей колоде достаточно карт!");
        }

        }else if(req.session.passport.user===player2id){

        if ((cardsamount!=0)&&(cardsplayer2.length<5)){
            var pos3=Math.floor(Math.random()*cardsamount+1);
            cardsplayer2[i]=cards[pos3];
            res.send(cardsplayer2); 
            i+=1;
            console.log(cardsplayer2);
            cardsamount-=1; 
            cards.splice(pos3,1);
            //console.log(cards);
        }else {
            res.send("В вашей колоде достаточно карт!");
        }

        }             
            
    });
    var skipflag1=false;
    var skipflag2=false;

    app.get('/skipwinner', function(req, res) {
        if (req.session.passport.user===player1id){
        res.send(cardsplayer2); 
         for (var i=0; i<cardsplayer1.length;i++){
        pointsplayer1+=cardsweight[cardsplayer1[i]];
        }       
        console.log(pointsplayer1);
        skipflag1=true;
        }else if(req.session.passport.user===player2id){
        res.send(cardsplayer1); 
            for (var i=0; i<cardsplayer2.length;i++){
        pointsplayer2+=cardsweight[cardsplayer2[i]];
        }
        console.log(pointsplayer2);
        skipflag2=true;
        }
        if ((pointsplayer1!=0)&&(pointsplayer2!=0)&&(pointsplayer1!=NaN)&&(pointsplayer2!=NaN)&&(skipflag1===true)&&(skipflag2===true)){
            if ((pointsplayer1<21)&&(pointsplayer2<21)&&(pointsplayer1>pointsplayer2)){
                sumplayer1.result+=+stakeplayer2.sum;
                sumplayer2.result-=+stakeplayer2.sum;
                module.exports.sumplayer1=sumplayer1.result;
                module.exports.sumplayer2=sumplayer2.result;
            }else if ((pointsplayer1<21)&&(pointsplayer2<21)&&(pointsplayer1<pointsplayer2)){
                sumplayer1.result-=+stakeplayer1.sum;
                sumplayer2.result+=+stakeplayer1.sum;
                module.exports.sumplayer1=sumplayer1.result;
                module.exports.sumplayer2=sumplayer2.result;
            }else if ((pointsplayer1<21)&&(pointsplayer2<21)&&(pointsplayer1===pointsplayer2)){
                sumplayer1.result+=0;
                sumplayer2.result+=0;
                module.exports.sumplayer1=sumplayer1.result;
                module.exports.sumplayer2=sumplayer2.result;
            }else if((pointsplayer1===21)&&(pointsplayer1!=pointsplayer2)){
                sumplayer1.result+=+stakeplayer2.sum;
                sumplayer2.result-=+stakeplayer2.sum;
                module.exports.sumplayer1=sumplayer1.result;
                module.exports.sumplayer2=sumplayer2.result;
            }else if((pointsplayer1===21)&&(pointsplayer2===21)){
                sumplayer1.result+=0;
                sumplayer2.result+=0;
                module.exports.sumplayer1=sumplayer1.result;
                module.exports.sumplayer2=sumplayer2.result;
            }else if ((pointsplayer1>21)&&(pointsplayer2<21)){
                sumplayer1.result-=+stakeplayer1.sum;
                sumplayer2.result+=+stakeplayer1.sum;
                module.exports.sumplayer1=sumplayer1.result;
                module.exports.sumplayer2=sumplayer2.result;
            }else if ((pointsplayer1<21)&&(pointsplayer2>21)){
                sumplayer1.result+=+stakeplayer2.sum;
                sumplayer2.result-=+stakeplayer2.sum;
                module.exports.sumplayer1=sumplayer1.result;
                module.exports.sumplayer2=sumplayer2.result;
            }else if ((pointsplayer1>21)&&(pointsplayer2===21)){
                sumplayer1.result-=+stakeplayer1.sum;
                sumplayer2.result+=+stakeplayer1.sum;
                module.exports.sumplayer1=sumplayer1.result;
                module.exports.sumplayer2=sumplayer2.result;
            }else{
                sumplayer1.result+=0;
                sumplayer2.result+=0;
                module.exports.sumplayer1=sumplayer1.result;
                module.exports.sumplayer2=sumplayer2.result;
            }
        }
    }); 

   

     app.post('/doingstake', function(req, res) {
        if (req.session.passport.user===player1id){
        stakeplayer1.sum=req.body.sum;
        res.send(stakeplayer1.sum);
        console.log(stakeplayer1.sum);
        }else if(req.session.passport.user===player2id){
        stakeplayer2.sum=req.body.sum; 
        res.send(stakeplayer2.sum);
        console.log(stakeplayer2.sum);       
        }
        
    });

     app.get('/cleartable',function(req, res) {
        
        if (req.session.passport.user===player1id){
            module.exports.player1id=player1id;
            res.send("player1");
            /*res.send(JSON.stringify(sumplayer1.result));*/
            pointsplayer1=0;   
        }else if (req.session.passport.user===player2id) {
            module.exports.player2id=player2id;
            res.send("player2");
            /*res.send(JSON.stringify(sumplayer2.result));*/
            pointsplayer2=0;
        }
        skipflag1=false;
        skipflag2=false;
        cardsplayer1=[];
        cardsplayer2=[];
        });
        

};




