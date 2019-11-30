const express = require('express')
const route = express.Router()
const NoticiaController = require('./../controllers/noticia')

route.get('/noticia', NoticiaController.get)
route.get('/noticia/:id', NoticiaController.getById)
route.post('/noticia', NoticiaController.create)
route.put('/noticia/:id', NoticiaController.update)
route.delete('/noticia/:id', NoticiaController.delete)

module.exports = route