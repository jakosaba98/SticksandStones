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
        if(!req.session.name)
            res.redirect('/login.html');
        else
        fs.readFile('./static/html/mappa.html', (err, data) => {
            if (err)
                res.status(404).send();
            else
                res.header('Content-Type', 'text/html; charset=utf-8').send(setUser(req.session, data.toString()));
        });
    })
    fastify.get('/logout',async(request,response) => {
        if (request.session.name) {
            request.sessionStore.destroy(request.session.sessionId, (err) => {
              if (err) {
                response.status(500).send();
              } else {
                request.session = null
                response.redirect('/');// logged out successfully
              }
            })
          } else
                response.redirect('/');
    });
}
module.exports=routes;

function setUser(session, file) {
    if(session.name)
    {
        file=file.replace('<a class="dropdown-item" href="login.html">Accedi</a>','<a style="display: block;padding: .25rem 1.5rem;">'+session.name+'</a>');
        file=file.replace('<a class="dropdown-item" href="registrazione.html">Registrati</a>', '<a class="dropdown-item" href="logout">Logout</a>');
    }
    return file;
}