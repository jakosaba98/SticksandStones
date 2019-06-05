// this file responds all public requests

const routes = async (fastify, options) => {
    fastify.get('/login.html',async(req,res)=>{
        // return login page if not logged
        if(!req.session.user_id)
        {
            res.sendFile('login.html')
        }
        else
            res.redirect('/');
        
    })
}
module.exports=routes;