import 'dotenv/config'
import { Router } from 'express'
import loginDTO from '../models/loginDTO'
import Utils from './utils'
import UsuarioService from "../services/usuarioService"
import usuarioRequest from "../models/requests/usuarioRequest"

const usuarioService = new UsuarioService()
const securityUtils = new Utils()
const router = Router()

router.post('/oauth/login', async (req, res) => {
  const userDetails = req.body as loginDTO
  try {
    res.json({ token: await securityUtils.getToken(userDetails) })
  } catch (err) {
    console.log(err);
    res.status(401).send('Acesso negado')
  }
})

router.all('/*', (req, res, next) => {
  if (req.method === 'POST' && req.path === '/usuarios/cadastrar') {
    next()
  } else {
    //Processo de validação do token JWT
    try {
      const token = req.headers.authorization?.split('Bearer ')[1]!
      securityUtils.verifyToken(token)
      next()
    } catch (err) {
      res.status(401).send('Acesso negado')
    }
  }
})

export default router