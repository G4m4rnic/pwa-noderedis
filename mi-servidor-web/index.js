const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var redis = require('redis');
var client = redis.createClient(); //creates a new client
var cursada_valor = 0;
client.on('connect', function() {
    console.log('connected');

});

app.use(express.static(__dirname + '/public/'));

app.listen('3000', function() {
    console.log('Servidor web escuchando en el puerto 3000');
});

app.use(bodyParser.json())

app.post('/nueva_cursada', (req, res) => {
    let sarasa = req.body.hola
    console.log("Nueva cursada: ", sarasa)

    let mat = req.body.mat // document.getElementById(inputcarrera).value;
    let ins = req.body.ins // document.getElementById(inputmateria).value;
    let tur = req.body.tur // document.getElementById(inputturno).value;
    let car = req.body.car // document.getElementById(inputinscriptos).value;
    let aul = req.body.aul;

    if (cursada_valor == 0) {
        //seteo una nueva cursada
        cursada_valor += 1;
        cursada = String(cursada_valor)
        console.log("Registro cursada: " + cursada);
        //grabo en redis
        client.hmset(cursada, "carrera", car, "materia", mat, "inscriptos", ins, "turno", tur, "aula", aul);

        return cursada_valor;
        console.log(cursada_valor);

    } else if (cursada_valor < 10) {
        //seteo una nueva cursada
        cursada_valor += 1;
        cursada = String(cursada_valor)
        console.log("Registro cursada: " + cursada);
        //grabo en redis
        client.hmset(cursada, "materia", mat, "inscriptos", ins, "turno", tur, "aula", aul);
        return cursada_valor;
        console.log(cursada_valor);
    } else {
        console.log("llegaste al maximo de cursadas")
    }
    res.send({ status: 200 })
})

// get aulas
app.get('/aulas_keys', (req, res) => {

    client.keys('aula:*', function(err, results) {


        if (err) {

            // do something like callback(err) or whatever

        } else {

            // do something with results

            aulaJSON = { count: "0", results: [] }

            results.forEach(element => {
                aulaJSON.count = parseInt(aulaJSON.count + 1);
                aulaJSON.results.push(element.split(":")[1]);
                console.log(element);
            });
            return res.json(aulaJSON);
            res.send({ status: 200 })
            console.log(results)

        }
    });

});


app.get('/aula/:id', (req, res) => {
    console.log(req.params.id);
    client.hgetall('aula:' +
        req.params.id,
        function(err, results) {

            if (err) {
                console.log(err);
                // do something like callback(err) or whatever

            } else {

                // do something with results
                console.log(results)
                return res.json(results);

                res.send({ status: 200 })
            }

        });

});



/* start express server at 3000 port
app.listen(3000, () => {
  console.log('Server listening on port: ', 3000)
});*/