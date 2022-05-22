export default interface usuario {
  id?: string,
  nome: string,
  email: string,
  pais: string,
  estado: string,
  municipio: string,
  cep: string,
  rua: string,
  numero: string,
  complemento?: string,
  cpf: string,
  pis: string,
  encrypted_password: string
}