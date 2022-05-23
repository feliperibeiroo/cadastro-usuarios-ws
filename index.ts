import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
//Controllers
import usuariosController from './controllers/usuariosController'
//Security
import oauth from './security/oauth'
import http from 'http'

import { createUsuarioTableIfNotExists } from './repositories/usuarioRepository'
createUsuarioTableIfNotExists()

const PORT: number = parseInt(process.env.PORT as string)
const HOST = process.env.HOST as string
const app = express()
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors())
app.use('/', oauth)
app.use('/usuarios', usuariosController)

http.createServer(app).listen(PORT, HOST, ()=>{
    console.log(`Servidor iniciado na porta ${PORT}...`)
})