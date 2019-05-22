const Influx = require('influxdb-nodejs');
const config = require('../config.json');

const connString = "http://"+config.username+":"+config.password+"@"+config.ipaddress+":"+config.port+"/"+config.databasename;

const routes = async (fastify, options) => {
    fastify.get("/",async (req,res) => {
        const client = new Influx(connString);
        client.query(config.measurement)
                .set({limit: 20})//last 20 rows
                .then((result)=>res.send(result.results[0].series[0]))
                .catch((err)=>res.status(500).send(err));
    })
    fastify.get("/:id",async (req,res) => {
        const client = new Influx(connString);
        let id_req = parseInt(req.params.id);
        client.query(config.measurement)
                .where({
                    id: id_req
                })
                .set({limit: 20})
                .then((result)=>res.send(result.results[0].series))
                .catch((err)=>res.status(500).send(err));
    })
    fastify.post("/",async (req,res) => {
        const client = new Influx(connString);
        client.write(config.measurement)
                .tag({
                    id: req.body.id
                })
                .field({
                    count: req.body.count,
                    doors: req.body.doors,
                    lat: req.body.lat,
                    lng: req.body.lng,
                })
        .then((result)=>res.send(result))
        .catch((err)=>res.status(500).send(err));
    })
    fastify.post("/test",async (req,res) => {
        //const client = new Influx(connString);
        console.log(req.body);
        res.status(204).send();
    })
    fastify.get("/ping", async (req,res)=> { // verifica che il server sia raggiungibile
        res.status(204).send();
    });
}
module.exports=routes;