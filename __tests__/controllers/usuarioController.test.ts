import usuarioController from '../../controllers/usuariosController'
const request = require('supertest')

beforeEach(() => {
  request()
})

describe('Testando Controllers', () => {
  test('GET', () => {
    request(usuarioController)
      .get('/usuarios')
      .expect
  })
})