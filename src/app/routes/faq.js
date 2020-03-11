const express = require('express')
const route = express.Router()
const FaqController = require('./../controllers/faq')

route.get('/faq', FaqController.getFaqWithParams)
// route.get('/faq', FaqController.get)
route.post('/faq', FaqController.create)
route.put('/faq/:id', FaqController.update)
route.delete('/faq/:id', FaqController.delete)

module.exports = route