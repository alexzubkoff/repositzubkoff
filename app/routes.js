// app/routes.js
module.exports = function(app, passport) {

   
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));



    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
     app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/choosegame',isLoggedIn, function(req, res) {
        res.render('choosegame.ejs',{
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/localgame',isLoggedIn, function(req, res) {
        res.render('localgame.ejs',{
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/exitgame',function(req, res) {
         res.render('index.ejs');
    });

   var cookieflag=false;
   var player1_id;
   var player2_id;
    
    
    
   app.get('/netgame',isLoggedIn,function(req, res) {
        if ((player1_id===undefined)&&(player2_id===undefined)){           
            player1_id=req.session.passport.user;
            console.log(player1_id);           
            res.render('netgame.ejs',{
            user : req.user 
            });
         module.exports.player1_id=player1_id;   
        }else if ((player1_id!=undefined)&&(player2_id===undefined)){
            player2_id=req.session.passport.user;
            console.log(player2_id);    
            res.render('netgame.ejs',{
            user : req.user 
            });
             module.exports.player2_id=player2_id;
        }else{
            res.redirect('/');
        }
            
    });

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
         return next();
    
        res.redirect('/');
    }

}