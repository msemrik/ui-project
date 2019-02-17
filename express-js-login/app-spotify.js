var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
var session = require('express-session');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');

// app.set('view engine', 'jade');
// app.set('views','./views');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

var Users = [];
var newPromise;
var spotifyApi;

app.get('/spotifylogin', function(req, res) {
   var scopes = 'user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public';
   res.redirect('https://accounts.spotify.com/authorize' +
       '?response_type=code' +
       '&client_id=' + '2d38f2f3447c478eb13d74c62b5eb58a' +
       (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
       '&redirect_uri=' + encodeURIComponent('http://localhost:3000/islogged'));
});

app.get('/other', function(req, res){

   spotifyApi = new SpotifyWebApi({
      clientId: '2d38f2f3447c478eb13d74c62b5eb58a',
      clientSecret: '36b86b6a2c29409cb42e63c5c9e45ba5',
      redirectUri: 'http://localhost:3000/islogged'
   });

   newPromise = spotifyApi.clientCredentialsGrant()
       .then(function(data) {
          console.log('The access token is ' + data.body['access_token']);
          spotifyApi.setAccessToken(data.body['access_token']);
       }, function(err) {
          console.log('Something went wrong!', err);
       });


   newPromise.then(function(){
      spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
          function(data) {
             console.log('Artist albums', data.body);
          },
          function(err) {
             console.error(err);
          }
      );
   });


   // newPromise.then(function() {
   //    spotifyApi.getMe()
   //        .then(function (data) {
   //           console.log('Some information about the authenticated user', data.body);
   //        }, function (err) {
   //           console.log('Something went wrong!', err);
   //        });
   // });

   newPromise.then(function() {

   spotifyApi.getUserPlaylists('thelinmichael')
       .then(function(data) {
          console.log('Retrieved playlists', data.body);
       },function(err) {
          console.log('Something went wrong!', err);
       });

   });

   res.render('build/index');
});


app.get('/islogged', function(req, res){


   var otherPromise =newPromise.then(function() {
      var code = req.query.code;
      spotifyApi.authorizationCodeGrant(code).then(
       function(data) {
          console.log('The token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
          console.log('The refresh token is ' + data.body['refresh_token']);

          // Set the access token on the API object to use it in later calls
          spotifyApi.setAccessToken(data.body['access_token']);
          spotifyApi.setRefreshToken(data.body['refresh_token']);
       },
       function(err) {
          console.log('Something went wrong!', err);
       }
   ).then(function() {

           thirdPromise = spotifyApi.getMe()
               .then(function (data) {
                   console.log('Some information about the authenticated user', data.body);
                   return data;
               }, function (err) {
                   console.log('Something went wrong!', err);
               }).then(function(data){
                   console.log(data);
                   spotifyApi.createPlaylist(data.body.id, "new Playlist test").then(function(data){
                       console.log('Some information about the new playlist', data);
                   },function(err){
                       console.log('Some information about the error creating the new playlist', err);
                   });
               });


       });;

   });




    // var thirdPromise;
    otherPromise

    // thirdPromise.then(function(data){
    //     console.log(data);
    // });

   res.render('islogged');
});

app.get('/signup', function(req, res){
   res.render('signup');
});

app.post('/signup', function(req, res){
   if(!req.body.id || !req.body.password){
      res.status("400");
      res.send("Invalid details!");
   } else {
      Users.filter(function(user){
         if(user.id === req.body.id){
            res.render('signup', {
               message: "User Already Exists! Login or choose another user id"});
         }
      });
      var newUser = {id: req.body.id, password: req.body.password};
      Users.push(newUser);
      req.session.user = newUser;
      res.redirect('/protected_page');
   }
});
function checkSignIn(req, res,next){
   if(req.session.user){
      next();     //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log(req.session.user);
      next(err);  //Error, trying to access unauthorized page!
   }
}
app.get('/protected_page', checkSignIn, function(req, res){
   res.render('protected_page', {id: req.session.user.id})
});

app.get('/login', function(req, res){
   res.render('login');
});

app.post('/login', function(req, res){
   console.log(Users);
   var redirected = false;
   if(!req.body.id || !req.body.password){
      res.render('login', {message: "Please enter both id and password"});
   } else {
      Users.filter(function(user){
         if(user.id === req.body.id && user.password === req.body.password){
            req.session.user = user;
	    redirected = true;
            res.redirect('/protected_page');
         }
      });
	if(!redirected){
      res.render('login', {message: "Invalid credentials!"});
}
   }
});

app.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
});

app.use('/protected_page', function(err, req, res, next){
console.log(err);
   //User should be authenticated! Redirect him to log in.
   res.redirect('/login');
});

app.listen(3000);
