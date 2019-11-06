const {isUserLogged} = require('../services/functions');
// this file responds only logged reqs

const routes = async (fastify, options) => {
    /*
    NEED IMPLEMENTATION
    fastify.get('/orari.html',async(req,res) => {
        if(req.session.name)
            res.redirect('/login.html');
    })
    */
    fastify.get('/mappa.html',async(req,res)=>{
        isUserLogged(req,res);
        res.sendFile('mappa.html');
    })
    fastify.get('/logout',async(req,res) => {
        isUserLogged(req,res,false);
        req.sessionStore.destroy(req.session.sessionId, (err) => {
            if (err)
                res.status(500).send();
            else
            {
                req.session = null;
                res.redirect('/');// logged out successfully
            }
        })
    });
}
module.exports=routes;