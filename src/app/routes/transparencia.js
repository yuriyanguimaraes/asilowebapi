const express = require('express')
const route = express.Router()
const TransparenciaController = require('./../controllers/transparencia')

route.get('/transparencia', TransparenciaController.getWithParams)
route.get('/transparencia/:id', TransparenciaController.getById)
route.post('/transparencia', TransparenciaController.create)
route.put('/transparencia', TransparenciaController.update)
route.delete('/transparencia', TransparenciaController.delete)

module.exports = route