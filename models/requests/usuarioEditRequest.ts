export default interface usuarioEditRequest {
  nome: string
  email: string
  endereco: {
    pais: string,
    estado: string,
    municipio: string,
    cep: string,
    rua: string,
    numero: string,
    complemento?: string
  },
  cpf: string
  pis: string
}