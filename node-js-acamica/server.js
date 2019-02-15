// Cargamos el modulo de HTTP
var http = require("http");
var url = require("url");

// Creamos un servidor hola mundo
var server = http.createServer(function (req, res) {
console.log(req.url);

if(req.url === "/"){   
var query = url.parse(req.url, true).query;

	res.writeHead(200, {"Content-Type": "text/html"});
	res.end("<h1>Hola Mundo!... <br><br>Digo " + query.nombre + "</h1>");
} else if (req.url === "/favicon.ico"){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end("<h1>Hola Mundo2!</h1>");
} else {
var query = url.parse(req.url, true).query;

	res.writeHead(200, {"Content-Type": "text/html"});
	res.end("<h1>Hola Mundo!... <br><br>Digo " + query.nombre + "</h1>");}


});


// Decimos en que puerto queremos escuchar (el 8000)
server.listen(8000);

// Indicamos que vamos a
console.log("Esperando requests en el puerto 8000");
