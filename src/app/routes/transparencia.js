const express = require('express')
const route = express.Router()
const TransparenciaController = require('./../controllers/transparencia')

route.get('/transparencia', TransparenciaController.get)
route.get('/transparencia/:category', TransparenciaController.getByCategory)
route.post('/transparencia', TransparenciaController.create)
route.put('/transparencia', TransparenciaController.update)
route.delete('/transparencia', TransparenciaController.delete)

module.exports = route