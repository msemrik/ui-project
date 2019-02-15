var express = require('express');
var saludador = require('./saludador');

var exphbs  = require('express-handlebars');

var bodyParser=require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/postURL',function(req,res){

console.log(req.body);
res.send("aaa")});

//app.engine('handlebars', exphbs({defaultLayout:__dirname + '/views/layouts/main.handlebars'}));
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


logMiddleware =function(req,res,next){
console.log("asd" + req.url);
  next();
};

app.use(logMiddleware);

app.get('/', function (req, res) {
  // Obtenemos el nombre (no necesitamos el modulo url!)
  
  res.render('index2', {hashtag:(req.query.hashtag != null)? req.query.hashtag : 'ninguno' });
});

// Decimos en que puerto queremos escuchar (el 8000)
app.listen(8000, function () {
  console.log("Esperando requests en el puerto 8000");
});
