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

fastify.setErrorHandler((error, request, reply)=>{
  if(error.message==='Not Found')// statusCode 404
  {
    reply.sendFile('error404.html')
  }
  else
  if(error.message==='Internal Server Error')// statusCode 500
  {
    reply.sendFile('error500.html')
  }
  else
    reply.send(error);
})

fastify.register(require('./static/public'),{ prefix: '/' });
fastify.register(require('./static/private'),{ prefix: '/' });
fastify.listen(80,'127.0.0.1');