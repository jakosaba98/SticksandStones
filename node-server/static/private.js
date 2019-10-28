const fs = require('fs');
// this file responds only logged requests

const routes = async (fastify, options) => {
    // every request has if(req.session.user_id)
    
    fastify.get('/orari.html',async(req,res) => {
        if(req.session.user_id)
            res.redirect('/login.html');
    })
    fastify.get('/mappa.html',async(req,res)=>{
        // return login page if not logged in
        /*if(!req.session.user_id)
            res.redirect('/login.html');
        else*/
        fs.readFile('./static/html/mappa.html', (err, data) => {
            if (err)
                res.status(404).send();
            else
                res.header('Content-Type', 'text/html; charset=utf-8').send(setUser(req.session, data.toString()));
        });
    })
}
module.exports=routes;

function setUser(session, file) {/*
    let username=session.name
    file.replace(/dog/gi, '');*/
    return file;
}