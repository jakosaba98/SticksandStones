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
    // give token
    fastify.get('/gettoken', (req, res) => {
        const token = fastify.jwt.sign({
            //id: req.body.user
        })// id autobus, descrizione eventualmente altro
        res.send({ token })
      })
    //websocket is listening
    fastify.get('/', { websocket: true }, (connection, req) => {
        connection.socket.on('connection',socket=>{
            socket.on('message',message=>{
                console.log(['MESSAGGIO',message]);
            })
            socket.on('error',error=>{
                console.log(error);
                socket.close();
            })
        });

        connection.socket.on('message', message => {
            console.log(['messaggio',message/*,req*/]);
            connection.socket.id=message;
            clearInterval(connection.socket.interval);
            connection.socket.interval=setInterval(()=>{
                const influx = new Influx.InfluxDB(influxConfig);
                let timestamp=new Date().getTime()*1000000-refreshRate*1000000;
                let queryString=`select *
                                from ${config.measurement}
                                where id = ${Influx.escape.stringLit(connection.socket.id)}`;
                if(!isNaN(timestamp))
                    queryString+=' and "time" > '+timestamp;
                queryString+=' order by time desc';
                influx.query(queryString)
                    .then(results => connection.socket.send(results))
                    .catch((err)=>console.log(err));//any better way to log this??
            },refreshRate);
        })/*
        connection.socket.on('close', (code,reason) => {
            console.log(['Connessione chiusa',code,reason]);
            clearInterval(connection.socket.interval);
        })*/
        connection.socket.on('error', error => {
            console.log(error);
        });
    });
}
module.exports=routes;