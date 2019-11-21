const {readKey,readCert} = require('./functions')
const fastify = require('fastify')({
    ignoreTrailingSlash: true,
    http2: true,
    https: {
      key: readKey(),
      cert: readCert(),
      passphrase: 'pass'
    }
});
const fastifySession = require('fastify-session');
const fastifyCookie = require('fastify-cookie');
const { serverConfig } = require('./custom_config');
const path = require('path');
const cookieName = 'sessionId';

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: 'fb348hf4889f43qy9r8fy93q884dt3j2',
  cookieName: cookieName,
  cookie: {secure:false},
  expires: 1800000
});
fastify.register(require('fastify-jwt'), {
  secret: 'ilsegretodisands'
})

fastify.register(require('fastify-websocket'),{
  options: {
    path: '/bus', // we accept only connections matching this path
    verifyClient: function (info, next) {
      try{
        token = info.req.url.replace('/bus?token=','');
        fastify.jwt.verify(token);
        next(true); // the connection is allowed
      }
      catch(e){
        console.log(e);
        next(false); // the connection is not allowed
      }
    }
  }
});

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../static/html')
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
fastify.register(require('./websocket'),{ prefix: '/bus' });

fastify.register(require('../static/public'),{ prefix: '/' });
fastify.register(require('../static/private'),{ prefix: '/' });

//if url request does not match any of implemented API, server will send 404 page
fastify.setNotFoundHandler((req, rep) => {
  rep.sendFile('error404.html');
})

fastify.listen(serverConfig.port,serverConfig.ipaddress,(err)=>{
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  else
    console.log('Server running on port '+serverConfig.port);
});