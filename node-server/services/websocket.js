const Influx = require('influx');
const config = require('../config.json');
const refreshRate=4000;//ms
const influxConfig = {
    host: config.ipaddress,
    database: config.influx.database,
    port: config.influx.port,
    username: config.influx.username,
    password: config.influx.password,
    schema: [
    {
        measurement: config.influx.measurement,
        fields: {
          count: Influx.FieldType.FLOAT,
          doors: Influx.FieldType.BOOLEAN,
          lat: Influx.FieldType.FLOAT,
          lon: Influx.FieldType.FLOAT
        },
        tags: [
          'id'
        ]
    }
    ]
}

const routes = async (fastify, options) => {
    let interval=null;
    // give token
    fastify.get('/gettoken', async (req, res) => {
        if (req.session.name) {
            const token = fastify.jwt.sign({});
            res.send({ token })
        }
        else
            res.status(401).send();
      })
    //websocket is listening
    fastify.get('/', { websocket: true }, (connection, req) => {
        if(!interval)
            interval=setInterval(()=>{
                const influx = new Influx.InfluxDB(influxConfig);
                let timestamp=new Date().getTime()*1000000-refreshRate*1000000;
                let queryString=`select *
                                from ${config.measurement}
                                where id = ${Influx.escape.stringLit(connection.socket.id)}`;
                console.log(queryString);
                if(!isNaN(timestamp))
                    queryString+=' and "time" > '+timestamp;
                queryString+=' order by time desc';
                influx.query(queryString)
                    .then(results => connection.socket.send(results))
                    .catch((err)=>console.log(err));//any better way to log this??
            },refreshRate);
        connection.socket.on('message', id => {
            try{
                connection.socket.id=Number(id);
            }
            catch(e){
                console.log(e);
            }
        });
        connection.socket.on('error', error => {
            console.log(error.code);
        });
    });
}
module.exports=routes;