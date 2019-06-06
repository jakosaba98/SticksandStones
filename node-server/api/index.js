const Influx = require('influxdb-nodejs');
const config = require('../config.json');
const { Pool } = require('pg')
const psqlconfig = {
    user: config.postgres,
    host: config.ipaddress,
    database: config.dbpostgres,
    password: config.postgres
}

const connString = 'http://'+config.username+':'+config.password+'@'+config.ipaddress+':'+config.port+'/'+config.databasename;

const routes = async (fastify, options) => {
    fastify.get('/',async (req,res) => {
        const client = new Influx(connString);
        client.query(config.measurement)
                .set({limit: 20})//last 20 rows
                .then((result)=>res.send(result.results[0].series[0]))
                .catch((err)=>res.status(500).send(err));
    })
    fastify.get('/ping', async (req,res)=> { // verifica che il server sia raggiungibile
        res.status(204).send();
    });
    fastify.get('/:id',async (req,res) => {
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
    fastify.post('/',{preValidation: [fastify.authenticate]},async (req,res) => {
        const client = new Influx(connString);
        client.write(config.measurement)
                .tag({
                    id: req.body.id
                })
                .field({
                    count: req.body.count,
                    doors: req.body.doors,
                    lat: req.body.lat,
                    lng: req.body.lon,
                })
        .then((result)=>res.send(result))
        .catch((err)=>res.status(500).send(err));
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
                if(password===res.rows[0].password)
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
        let hash = bcrypt.hashSync(myPlaintextPassword, salt);// generare la password e salvarlo nel database
        
        req.body.level;// livello di autorizzazione (0=utente base 1=segretario 2=gestore 3=admin ma non accettabile da api)
        
        pool.query('INSERT INTO Account(username,password,email,salt,account_type,created_on) VALUES($1,$2,$3,$4,NOW())',
                            [req.body.username,hash,req.body.email,salt,req.body.account_type])
        .then(() =>{
            res.send('Registrazione effettuata con successo!');
        })
        .catch(err => res.status(500).send(err))
    });

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