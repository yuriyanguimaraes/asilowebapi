const mongoose = require('mongoose')
const ContatoModel = require('./../models/contato')

class Contato {

    get(req, res) {
        ContatoModel.find({}, (contato, err) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(contato)
            }
        })
    }
    
}

module.exports = new Contato()