const Influx = require('influxdb-nodejs');
const config = require('../config.json');
const { Pool } = require('pg')
const psqlconfig = {
    host: config.ipaddress,
    user: config.username,
    password: config.password
}

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
    fastify.get("/ping", async (req,res)=> { // verifica che il server sia raggiungibile
        res.status(204).send();
    });
    fastify.post("/login",async (req,res) => {
        const pool = new Pool(psqlconfig);
        
        pool.query('SELECT id,username,password,salt,account_type FROM Account WHERE username=$1', [req.body.username])
        .then((result) =>{
            let password = bcrypt.hashSync(req.body.crypted_password, result.rows[0].salt)
            if(password===res.rows[0].password)
            {
                // invia token?
                await req.session.set({
                    user_id: result.rows[0].id,
                    auth: result.rows[0].account_type
                })
                // aggiorna last_login
                pool.query('UPDATE Account SET last_login = $1 WHERE id = $2',[new Date().toISOString(),result.rows[0].id],()=>{
                    pool.end();
                    res.redirect('/home');
                })
            }
            else
            {
                pool.end();
                res.status(401).send();// unauthorized
            }
        })
        .catch(err => res.status(500).send(err))
    });
    fastify.post("/register",async(req,res) => {
        const pool = new Pool(psqlconfig);
        let salt = bcrypt.genSaltSync(10);// generare il sale e salvarlo nel database
        let hash = bcrypt.hashSync(myPlaintextPassword, salt);// Store hash in your password DB.
        
        req.body.level;// livello di autorizzazione (0=utente base 1=segretario 2=gestore 3=admin ma non accettabile da api)
        
        pool.query('INSERT INTO Account(username,password,email,salt,account_type,created_on) VALUES($1,$2,$3,$4,NOW())',
                            [req.body.username,hash,req.body.email,salt,req.body.account_type])
        .then((result) =>{
            res.send("Registrazione effettuata con successo!");
        })
        .catch(err => res.status(500).send(err))
    });

    fastify.post("/logout",async(req,res) => {
        const session = await req.session.get();
        await req.session.store.delete_all('user_id', session.id);
        res.redirect('/home');// logout effettuato con successo
    });
}
module.exports=routes;