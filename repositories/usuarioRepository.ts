import 'dotenv/config'
import Knex from 'knex'
const parse = require("pg-connection-string").parse;

var pgConfig:any = {}
if (process.env.NODE_ENV==='production') {
  pgConfig = parse(process.env.DATABASE_URL);
  pgConfig.ssl = { rejectUnauthorized: false }
} else { 
  pgConfig =  {
    host : process.env.POSTGRES_URL || '0.0.0.0',
    port : 5432,
    user : 'postgres',
    password : process.env.POSTGRES_PASSWORD,
    database : 'postgres'
  }
}

const db = Knex({
  client: "pg",
  connection: pgConfig,
});

export default db

export function createUsuarioTableIfNotExists(): void {
  db.schema.createTableIfNotExists('usuarios', function (table) {
    table.increments('id');
    table.string('nome');
    table.string('email').unique();
    table.string('estado');
    table.string('pais');
    table.string('municipio');
    table.string('cep');
    table.string('rua');
    table.string('numero');
    table.string('complemento');
    table.string('cpf').unique();
    table.string('pis').unique();
    table.string('encrypted_password');
  }).then(() => {
    console.log('Tabela usuarios criada'); 
  }).catch(() => {
    console.log('Tabela usuarios já existe ou não pode ser criada');
  })
}