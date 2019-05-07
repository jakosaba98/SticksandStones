const fastify = require("fastify")({
    ignoreTrailingSlash: true
});

fastify.register(require("./api"),{ prefix: '/api' });
fastify.listen(80);