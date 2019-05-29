const fastify = require("fastify")({
    ignoreTrailingSlash: true
});
const FastifySession = require('fastify-session-sets');

fastify.register(require('fastify-cookie')).register(FastifySession, {
    references: {
      user_id: {},
      auth: {}
    }
  });

fastify.get("/",async (req,res) => {
    res.send();
})

fastify.register(require("./api"),{ prefix: '/api' });
fastify.listen(80,'0.0.0.0');
// change 0.0.0.0 to static ip address if possible!!