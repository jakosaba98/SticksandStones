const fastify = require('fastify')({
    ignoreTrailingSlash: true
});
const fastifySession = require('fastify-session');
const fastifyCookie = require('fastify-cookie');
const path = require('path');

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: 'fb348hf4889f43qy9r8fy93q884dt3j2',
  cookieName: 'sessionId',
  cookie: {secure:false},
  expires: 1800000
});
fastify.register(require('fastify-jwt'), {
  secret: 'ilsegretodisands'
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'static/html'),
  // serve: false // se si digita http://ip/index.html il server non dà risposta
})


fastify.decorate('authenticate',async(req,res)=>{
  try{
    await req.jwtVerify();
  }
  catch(error){
    res.send(error)
  }
})

fastify.register(require('./api'),{ prefix: '/api' });

fastify.setNotFoundHandler((req, rep) => {
  rep.sendFile('error404.html')
})

fastify.register(require('./static/public'),{ prefix: '/' });
fastify.register(require('./static/private'),{ prefix: '/' });
fastify.listen(80,'127.0.0.1');
