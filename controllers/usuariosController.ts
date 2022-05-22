import { Router } from "express"
import UsuarioService from "../services/usuarioService"
import usuarioRequest from "../models/requests/usuarioRequest"
import usuarioEditRequest from "../models/requests/usuarioEditRequest"
import changePasswordRequest from "../models/requests/changePasswordRequest"
import usuarioResponse from "../models/responses/usuarioResponse"
import Usuario from '../models/usuario'
import { Jwt, JwtPayload } from "jsonwebtoken"
import securityService from '../security/utils'
const usuarioService = new UsuarioService()
const utils = new securityService()

const router = Router()

router.get('/', async (req, res) => {
    const token = req.headers.authorization?.split('Bearer ')[1]!
    const payload = utils.verifyToken(token) as JwtPayload
    const usuario = await usuarioService.getUsuarioById(payload.id)
    res.json({ usuario: usuarioService.mapUsuarioToUsuarioResponse(usuario!) })
})

/* router.get('/get-by-email/:email', async (req, res) => {
    const email = req.params.email
    const usuario = await usuarioService.getUsuarioByEmail(email)
    res.json({ usuario: usuario })
})

router.get('/get-by-cpf/:cpf', async (req, res) => {
    const cpf = req.params.cpf
    const usuario = await usuarioService.getUsuarioByCpf(cpf)
    res.json({ usuario: usuario })
})

router.get('/get-by-pis/:pis', async (req, res) => {
    const pis = req.params.pis
    const usuario = await usuarioService.getUsuarioByPis(pis)
    res.json({ usuario: usuario })
}) */

router.post('/cadastrar', async (req, res) => {
    const requestData = req.body as usuarioRequest
    const wasCreated = await usuarioService.insertUsuario(requestData)
    res.json({ created: wasCreated })
})

router.post('/mudar-senha', async (req, res) => {
    const dataPasswordRequest = req.body as changePasswordRequest

    const token = req.headers.authorization?.split('Bearer ')[1]!
    const payload = utils.verifyToken(token) as JwtPayload
    const usuario = await usuarioService.getUsuarioById(payload.id)
    try {
        const wasChanged:boolean = await usuarioService.changePasswordUsuario(usuario!, dataPasswordRequest)
        res.json({ updated: wasChanged })
    } catch (EvalError) {
        res.json({ updated: 'before-password-not-matches' })
    }
})


router.put('/', async (req, res) => {
    const token = req.headers.authorization?.split('Bearer ')[1]!
    const payload = utils.verifyToken(token) as JwtPayload
    const uploadData = req.body as usuarioEditRequest
    const wasPutted = await usuarioService.putUsuario(payload.id, uploadData)
    res.json({ updated: wasPutted })
})

router.delete('/', async (req, res) => {
    const token = req.headers.authorization?.split('Bearer ')[1]!
    const payload = utils.verifyToken(token) as JwtPayload
    const wasDeleted = await usuarioService.deleteUsuario(payload.id)
    res.json({ deleted: wasDeleted })
})

export default router