const {isNotUserLogged} = require('../services/functions');
// this file responds all public requests

const routes = async (fastify, options) => {
    fastify.get('/login.html', async (req, res) => {
        isNotUserLogged(req,res);
        res.sendFile('login.html');
    })
    fastify.get('/registrazione.html', async (req, res) => {
        isNotUserLogged(req,res);
        res.sendFile('registrazione.html');
    })
    fastify.get('/', async (req, res) => {
        res.sendFile('index.htm');
    })
    fastify.get('/index.html', async (req, res) => {
        res.redirect('/');
    })
    fastify.get('/index.htm', async (req, res) => {
        res.redirect('/');
    })
    fastify.get('/azienda.html', async (req, res) => {
        res.sendFile('azienda.htm');
    })
}
module.exports = routes;