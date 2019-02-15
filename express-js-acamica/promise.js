console.log('init');
var Q = require('q');


var valor = 0;

console.log(valor);
var promise = Q.promise(function(resolve,reject){
setTimeout(function(){valor++;resolve();},1000);

});


promise.then(function(err, data){

console.log('ended promise3: ' + valor);

});

promise.then(function(err, data){


console.log('ended promise: ' + valor);
});


promise.then(function(err, data){

console.log('ended promise2: ' + valor);
});




setTimeout(function(){promise.then(function(err, data){


console.log('ended promise: ' + valor);
});},3000);



console.log(valor);
console.log('end');
