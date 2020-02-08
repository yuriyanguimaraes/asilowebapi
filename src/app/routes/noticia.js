const express = require('express')
const route = express.Router()
const NoticiaController = require('./../controllers/noticia')

route.get('/noticia', NoticiaController.getWithParams)
route.get('/noticia/:title', NoticiaController.getNoticiaByTitle)
route.get('/noticia/:_id', NoticiaController.getNoticiaById)
route.get('/noticia-three-results', NoticiaController.getThreeResults)
route.post('/noticia', NoticiaController.create)
route.put('/noticia/:id', NoticiaController.update)
route.delete('/noticia/:id', NoticiaController.delete)

module.exports = route
