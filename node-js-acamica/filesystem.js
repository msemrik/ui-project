var fs = require('fs');

var resultado = fs.readFileSync("index.js");

console.log(resultado.toString());



fs.readFile("index2.js", function(err,data){
if(err) throw err;
console.log("Imprimiendo resultado");
console.log(data.toString());

}


);
