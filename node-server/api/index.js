const Influx = require("influxdb-nodejs");
const databasename = "trasporto_pubblico";
const measurement = "";

const routes = async (fastify, options) => {
    fastify.get("/",async (req,res) => {
        const client = new Influx("http://127.0.0.1:8086/"+databasename);
        client.queryRaw('select * from "'+measurement+'"')
        .then(res.send)
        .catch(res.status(500).send);
    })
}
module.exports=routes;