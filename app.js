var redis = require('redis');
var client = redis.createClient(); //creates a new client

client.on('connect', function() {
    console.log('connected');

});

/*
var cursada = "3";
var mat = "matematica";
var ins = 20;
var tur = "noche";

//cuando agrego una nueva cursada le tengo que sumar 1 y verificar que sea menor de 5

client.hmset(cursada, "materia", mat, "inscriptos", ins, "turno", tur);


client.hgetall("3", (error, result) => {

    console.log("get", result);


});*/

//function nuevaCursada() {



console.log("Nueva cursada");
var cursada_valor = 0;

var mat = "matematica";
var ins = 25;
var tur = "noche";
var car = "Ingenieria"
var cursada_valor_string;

if (cursada_valor == 0) {
    //seteo una nueva cursada
    cursada_valor++;
    cursada = String(cursada_valor)
    console.log("Registro cursada: " + cursada);
    //grabo en redis
    client.hmset(cursada, "carrera", car, "materia", mat, "inscriptos", ins, "turno", tur);

} else {
    //seteo una nueva cursada
    cursada_valor++;
    cursada = String(cursada_valor)
    console.log("Registro cursada: " + cursada);
    //grabo en redis
    client.hmset(cursada, "materia", mat, "inscriptos", ins, "turno", tur);

}


//    }
/*
    if (pruebaNum = cursadaNum) {
        //sumo 1 a la cursada
        console.log("sumo 1");
        cursadaNum++;

        //parseo a string
        cursada = String(cursadaNum);
        console.log(cursada);

        //seteo nueva clave y nueva cursada en el hash
        client.hmset(cursada, "materia", mat, "inscriptos", ins, "turno", tur);
    }

var inscriptos = client.hget(cursada, inscriptos);


client.hgetall(cursada, (error, result) => {

    console.log("get", result);
});*/