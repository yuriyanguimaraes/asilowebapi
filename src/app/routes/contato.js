const express = require('express')
const route = express.Router()
const ContatoController = require('./../controllers/contato')

route.get('/contato', ContatoController.get)
route.post('/contato', ContatoController.create)
route.put('/contato/:id', ContatoController.update)
route.delete('/contato/:id', ContatoController.delete)

module.exports = route