import 'dotenv/config'
import jwt from 'jsonwebtoken'
import loginDTO from '../models/loginDTO'
import usuario from '../models/usuario'
import usuarioService from '../services/usuarioService'
import usuarioResponse from '../models/responses/usuarioResponse'
import Knex from 'knex'
import bcrypt from 'bcrypt'
import db from '../repositories/usuarioRepository'

export default class securityService {

  secret = process.env.SECRET as string

  async getUserFromDatabase(userDetails: loginDTO): Promise<usuario> {
    const usuario = await db.select()
        .from<usuario>('usuarios')
        .where('email', userDetails.user)
        .orWhere('pis', userDetails.user)
        .orWhere('cpf', userDetails.user)
        .first()
    if (usuario) {
        const match = bcrypt.compareSync(userDetails.password, usuario.encrypted_password)
        if (match) {
            return usuario
        } else {
            throw Error('Credenciais inválidas')
        }
    } else {
        throw Error('Credenciais inválidas')
    }
  }

  async getToken(userDetails: loginDTO) {
      try {
        const usuario = await this.getUserFromDatabase(userDetails)
        const token = jwt.sign({ 
                email: usuario.email,
                pis: usuario.pis,
                id: usuario.id
            }, 
            this.secret, { algorithm: 'HS256', 
            expiresIn: '1h' 
        })
        return token
      } catch (err) {        
          throw err
      }
  }

  verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, this.secret)
  }
}