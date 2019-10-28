// this file responds only logged requests

const routes = async (fastify, options) => {
    // every request has if(req.session.user_id)
    
    fastify.get('/orari.html',async(req,res) => {
        if(req.session.user_id)
            res.redirect('/login.html');
        else
            res.sendFile('orari.html');
    })
    fastify.get('/mappa.html',async(req,res)=>{
        // return login page if not logged in
        /*if(!req.session.user_id)
            res.redirect('/login.html');
        else*/
            res.sendFile('mappa.html');
    })
}
module.exports=routes;