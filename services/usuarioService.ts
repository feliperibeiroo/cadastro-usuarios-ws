import usuario from '../models/usuario'
import usuarioRequest from '../models/requests/usuarioRequest'
import usuarioEditRequest from '../models/requests/usuarioEditRequest'
import usuarioResponse from '../models/responses/usuarioResponse'
import db from '../repositories/usuarioRepository'
import changePasswordRequest from "../models/requests/changePasswordRequest"
import bcrypt from 'bcrypt'

export default class usuarioService {

  async getUsuarioByCpf (cpf: string): Promise<usuario | undefined> {
    const result = await db.table('usuarios')
      .select('*')
      .from<usuario>('usuarios')
      .where('cpf', cpf).first()
      return result
  }

  async getUsuarioByPis (pis: string): Promise<usuario | undefined> {
    return await db.table('usuarios')
      .select('*')
      .from<usuario>('usuarios')
      .where('pis', pis).first()
  }

  async getUsuarioByEmail (email: string): Promise<usuario | undefined> {
    return await db.table('usuarios')
      .select('*')
      .from<usuario>('usuarios')
      .where('email', email).first()
  }

  async getUsuarioById (id: string): Promise<usuario | undefined> {
    return await db.table('usuarios')
      .select('*')
      .from<usuario>('usuarios')
      .where('id', id).first()
  }

  async insertUsuario (usuario: usuarioRequest): Promise<boolean> {
      return await db.table('usuarios')
      .insert(this.mapUsuarioRequestToUsuario(usuario))
      .then(() => true, (err) => false)
    
  }

  async deleteUsuario (idUsuario: string): Promise<boolean> {
    return await db('usuarios')
      .where('id', idUsuario).del()
      .then((result) => result>0 ? true : false, () => false)
  }

  async putUsuario (idUsuario: string, data: usuarioEditRequest): Promise<boolean> {
    return await db('usuarios')
      .where('id', idUsuario)
      .update(this.mapUsuarioEditRequestToUsuarioEdit(data))
      .then(() => true, () => false)
  }

  async changePasswordUsuario (usuario: usuario, data: changePasswordRequest): Promise<boolean> {
    if (bcrypt.compareSync(data.senhaAnterior, usuario.encrypted_password)) {
      return await db('usuarios')
        .where('id', usuario.id)
        .update({ encrypted_password: bcrypt.hashSync(data.senhaNova, 10) })
        .then(() => true, () => false)
    } else {
      throw new EvalError
    }

  }

  mapUsuarioRequestToUsuario (usuarioRequest: usuarioRequest): usuario {
    
    return {
      nome: usuarioRequest.nome,
      email: usuarioRequest.email,
      pais: usuarioRequest?.endereco?.pais,
      estado: usuarioRequest?.endereco?.estado,
      municipio: usuarioRequest?.endereco?.municipio,
      cep: usuarioRequest?.endereco?.cep,
      rua: usuarioRequest?.endereco?.rua,
      numero: usuarioRequest?.endereco?.numero,
      complemento: usuarioRequest?.endereco?.complemento,
      cpf: usuarioRequest.cpf,
      pis: usuarioRequest.pis,
      encrypted_password: usuarioRequest.senha ? bcrypt.hashSync(usuarioRequest.senha, 10) : usuarioRequest.senha
    }
  }

  mapUsuarioEditRequestToUsuarioEdit (usuarioRequest: usuarioEditRequest): any {
    
    return {
      nome: usuarioRequest.nome,
      email: usuarioRequest.email,
      pais: usuarioRequest?.endereco?.pais,
      estado: usuarioRequest?.endereco?.estado,
      municipio: usuarioRequest?.endereco?.municipio,
      cep: usuarioRequest?.endereco?.cep,
      rua: usuarioRequest?.endereco?.rua,
      numero: usuarioRequest?.endereco?.numero,
      complemento: usuarioRequest?.endereco?.complemento,
      cpf: usuarioRequest.cpf,
      pis: usuarioRequest.pis
    }
  }

  mapUsuarioToUsuarioResponse (usuario: usuario): usuarioResponse {
    return {
      nome: usuario.nome,
      email: usuario.email,
      endereco: {
        pais: usuario.pais,
        estado: usuario.estado,
        municipio: usuario.municipio,
        cep: usuario.cep,
        rua: usuario.rua,
        numero: usuario.numero,
        complemento: usuario.complemento,
      },
      cpf: usuario.cpf,
      pis: usuario.pis,
    }
  }

}