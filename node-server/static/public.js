// this file responds all public requests

const routes = async (fastify, options) => {
    fastify.get('/login',async(req,res)=>{
        // return login page if not logged
        if(!req.session.user_id)
        {
            res.sendFile('login.html')
        }
        else
            res.redirect('/home');
        
    })

    fastify.get('/home',async(req,res)=>{
        res.sendFile('index.html');
    })

    fastify.get("/",async (req,res) => {
        res.redirect('/home');
    })
}
module.exports=routes;