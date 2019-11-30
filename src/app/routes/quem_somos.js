const express = require('express')
const route = express.Router()
const QuemSomosController = require('./../controllers/quem_somos')

route.get('/quemSomos', QuemSomosController.get)
route.post('/quemSomos', QuemSomosController.create)
route.put('/quemSomos/:id', QuemSomosController.update)
route.delete('/quemSomos/:id', QuemSomosController.delete)

module.exports = route