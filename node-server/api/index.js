const Influx = require('influx');
const config = require('../config.json');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const psqlconfig = {
    user: config.postgres.username,
    host: config.ipaddress,
    database: config.postgres.database,
    password: config.postgres.password,
    port: config.postgres.port
}
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
    fastify.get('/',async (req,res) => {
        const influx = new Influx.InfluxDB(influxConfig);
        let queryString=`select *
                        from ${config.measurement}
                        order by time desc
                        limit 20`;
        influx.query(queryString)
            .then(results => res.send(results))
            .catch((err)=>res.send(err));
    })
    //test if server is ready
    fastify.get('/ping', async (req,res)=> {
        const influx = new Influx.InfluxDB(influxConfig);
        influx.ping(5000).then(hosts => {
            hosts.forEach(host => {
              if (host.online) {
                res.status(204).send();
              } else {
                res.status(503).send('InfluxDB is offline');
              }
            })
          })
    });
    //returns last position of autobus {id} using filter {time}
    fastify.get('/:id/:time',async (req,res) => {
        const influx = new Influx.InfluxDB(influxConfig);
        let timestamp=new Date(Number(req.params.time)).getTime()*1000000;
        let queryString=`select *
                        from ${config.measurement}
                        where id = ${Influx.escape.stringLit(req.params.id)}`;
        if(!isNaN(timestamp))
            queryString+=' and "time" > '+timestamp;
        queryString+=' order by time desc';
        influx.query(queryString)
            .then(results => res.send(results))
            .catch((err)=>res.send(err));
    })
    //returns last position of autobus {id}
    fastify.get('/:id',async (req,res) => {
        const influx = new Influx.InfluxDB(influxConfig);
        let queryString=`select *
                        from ${config.measurement}
                        where id = ${Influx.escape.stringLit(req.params.id)}
                        order by time desc
                        limit 1`;
        influx.query(queryString)
            .then(results => res.send(results))
            .catch((err)=>res.send(err));
    })
    fastify.post('/',{preValidation: [fastify.authenticate]},async (req,res) => {
        const influx = new Influx.InfluxDB(influxConfig);
        influx.writePoints([
            {
              measurement: config.measurement,
              tags: { id: req.body.id },
              fields: {
                count: req.body.count,
                doors: req.body.doors,
                lat: req.body.lat,
                lon: req.body.lon
              }
            }
          ])
        .then((result)=>res.send(result))
        .catch((err)=>{console.log(err);res.status(500).send(err)});
    })

    fastify.post('/gettoken', (req, res) => {
        const token = fastify.jwt.sign({
            id: req.body.user
        })// id autobus, descrizione eventualmente altro
        res.send({ token })
      })

    //user api

    fastify.post('/login',async (req,res) => {
        const pool = new Pool(psqlconfig);

        pool.query('SELECT id,username,password,salt,account_type FROM Account WHERE username=$1', [req.body.username])
        .then((result) =>{
            if(result.rows[0])// username not found
            {
                let password = bcrypt.hashSync(req.body.crypted_password, result.rows[0].salt)
                if(password===result.rows[0].password)
                {
                    // salva la sessione
                    req.session.user_id = result.rows[0].id;
                    req.session.auth = result.rows[0].account_type;
                    // aggiorna last_login
                    pool.query('UPDATE Account SET last_login = $1 WHERE id = $2',[new Date().toISOString(),result.rows[0].id],()=>{
                        pool.end();
                        res.redirect('/');
                    })
                }
                else
                {
                    pool.end();
                    res.status(401).send();// unauthorized
                }
            }
            else
            {
                pool.end();
                res.status(401).send();// unauthorized
            }
        })
        .catch(err => res.status(500).send(err))
    });
    fastify.post('/register',async(req,res) => {
        const pool = new Pool(psqlconfig);
        let salt = bcrypt.genSaltSync(10);// generare il sale e salvarlo nel database
        let hash = bcrypt.hashSync(req.body.password, salt);// generare la password e salvarlo nel database

        level=1;// livello di autorizzazione (0=utente base 1=segretario 2=gestore 3=admin ma non accettabile da api)

        pool.query('INSERT INTO Account(username,password,email,salt,account_type,created_on) VALUES($1,$2,$3,$4,$5,NOW())',
                            [req.body.username,hash,req.body.email,salt,level])
        .then(() =>{
            res.send('Registrazione effettuata con successo!');
        })
        .catch(err => res.status(500).send(err))});

    fastify.post('/logout',async(req,res) => {
        if (request.session.authenticated) {
            request.sessionStore.destroy(request.session.sessionId, (err) => {
              if (err) {
                res.status(500).send('Internal Server Error')
              } else {
                request.session = null
                res.redirect('/')// logout effettuato con successo
              }
            })
          } else
                res.redirect('/');
    });
}
module.exports=routes;
