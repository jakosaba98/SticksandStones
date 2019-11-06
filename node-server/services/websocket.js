const Influx = require('influx');
const refreshRate=4000;//ms
const { influxConfig } = require('./custom_config');

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