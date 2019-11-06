const Influx = require('influx');
const config = require('../config.json');
module.exports.psqlConfig = {
    user: config.postgres,
    host: config.ipaddress,
    database: config.dbpostgres,
    password: config.postgres
}
module.exports.influxConfig = {
    host: config.ipaddress,
    database: config.databasename,
    port: config.port,
    username: config.username,
    password: config.password,
    schema: [
    {
        measurement: config.measurement,
        fields: {
          count: Influx.FieldType.FLOAT,
          doors: Influx.FieldType.BOOLEAN,
          lat: Influx.FieldType.FLOAT,
          lon: Influx.FieldType.FLOAT
        },
        tags: [
          'id'
        ]
    }
    ]
}
module.exports.serverConfig = {
  ipaddress: config.ipaddress,
  port: config.server.port
}