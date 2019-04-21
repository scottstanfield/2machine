const pgp = require('pg-promise')();
const fs = require('fs');

const connectionConf = {
    host: '35.185.213.57',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'simplepassword',
    ssl: {
        rejectUnauthorized : false,
        ca   : fs.readFileSync("certs/server-ca.pem").toString(),
        key  : fs.readFileSync("certs/client-key.pem").toString(),
        cert : fs.readFileSync("certs/client-cert.pem").toString(),
  }

};

const new_db = pgp(connectionConf);
new_db.any('select id, recipe_name from recipe_master LIMIT 10')
    .then(res => {console.log(res);})
    .catch(err => {console.error(err);})
    .then(() => {new_db.$pool.end()});
