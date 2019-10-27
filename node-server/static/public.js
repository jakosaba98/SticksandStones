// this file responds all public requests

const routes = async (fastify, options) => {
    fastify.get('/login.html',async(req,res)=>{
        // return login page if not logged in
        if(!req.session.user_id)
            res.sendFile('login.html')
        else
            res.redirect('/');
    })
    fastify.get('/registrazione.html',async(req,res)=>{
        // return login page if not logged in
        if(!req.session.user_id)
            res.sendFile('registrazione.html')
        else
            res.redirect('/');
    })
    fastify.get('/',async(req,res)=>{
        res.sendFile('index.htm');
    })
    fastify.get('/index.html',async(req,res)=>{
        res.redirect('/');
    })
    fastify.get('/azienda.html',async(req,res)=>{
        res.sendFile('azienda.html');
    })
    fastify.get('/orari.html',async(req,res)=>{
        // return login page if not logged in
        if(!req.session.user_id)
            res.redirect('/login.html');
        else
            res.sendFile('orari.html');
    })
    fastify.get('/mappa.html',async(req,res)=>{
        // return login page if not logged in
        if(!req.session.user_id)
            res.redirect('/login.html');
        else
            res.sendFile('mappa.html');
    })
    fastify.get('/test_mappe.html',async(req,res)=>{//remove plz!!!!!!!!!!
        res.sendFile('test_mappe.html');
    })
}
module.exports=routes;