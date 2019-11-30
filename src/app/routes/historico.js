const express = require('express')
const route = express.Router()
const HistoricoController = require('./../controllers/historico')

route.get('/historico', HistoricoController.get)
route.post('/historico', HistoricoController.create)
route.put('/historico/:id', HistoricoController.update)
route.delete('/historico/:id', HistoricoController.delete)

module.exports = route