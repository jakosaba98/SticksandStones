// this file responds only logged requests

const routes = async (fastify, options) => {
    // every request has if(req.session.user_id)
    
    fastify.post('/orari',async(req,res) => {
        if(req.session.user_id)
        {
            const pool = new Pool(psqlconfig);
            
            pool.query('SELECT id,username,password,salt,account_type FROM Account WHERE username=$1', [req.body.username])
            .then((result) =>{
                if(result.rows)// username not found
                {
                    let result=result.rows;//[{},{}]
                }
                else
                {
                    pool.end();
                    res.status(401).send();// unauthorized
                }
            })
            .catch(err => res.status(500).send(err))
        } else
        res.status(401).send();// unauthorized
    })
}
module.exports=routes;