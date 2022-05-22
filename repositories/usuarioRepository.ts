import 'dotenv/config'
import Knex from 'knex'
const config = process.env.NODE_ENV==='production' ? {
  client: 'pg',
  connection: process.env.DATABASE_URL
} : {
  client: 'pg',
    connection: {
      host : process.env.POSTGRES_URL || '0.0.0.0',
      port : 5432,
      user : 'postgres',
      password : process.env.POSTGRES_PASSWORD,
      database : 'postgres'
  }
}
const knex = Knex(config)

export default knex

export function createUsuarioTableIfNotExists(): void {
  knex.schema.createTableIfNotExists('usuarios', function (table) {
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