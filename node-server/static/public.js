const fs = require('fs');
// this file responds all public requests

const routes = async (fastify, options) => {
    fastify.get('/login.html', async (req, res) => {
        // return login page if not logged in
        if (!req.session.user_id)
            res.sendFile('login.html')
        else
            res.redirect('/');
    })
    fastify.get('/registrazione.html', async (req, res) => {
        // return login page if not logged in
        if (!req.session.user_id)
            res.sendFile('registrazione.html')
        else
            res.redirect('/');
    })
    fastify.get('/', async (req, res) => {
        fs.readFile('./static/html/index.htm', (err, data) => {
            if (err)
                res.status(404).send(err);
            else
                res.header('Content-Type', 'text/html; charset=utf-8').send(setUser(req.session, data.toString()));
        });
    })
    fastify.get('/index.html', async (req, res) => {
        res.redirect('/');
    })
    fastify.get('/index.htm', async (req, res) => {
        res.redirect('/');
    })
    fastify.get('/azienda.html', async (req, res) => {
        fs.readFile('./static/html/azienda.html', (err, data) => {
            if (err)
                res.status(404).send();
            else
                res.header('Content-Type', 'text/html; charset=utf-8').send(setUser(req.session, data.toString()));
        });
    })
}
module.exports = routes;

function setUser(session, file) {/*
    let username=session.name
    file.replace(/dog/gi, '');*/
    return file;
}