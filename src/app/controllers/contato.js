const mongoose = require('mongoose')
const ContatoModel = require('./../models/contato')

class Contato {

    get(req, res) {
        ContatoModel.find({}, (contato, err) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).json({ message: 'Dados recuperados com sucesso', data: contato })
            }
        })
    }

    create(req, res) {
        ContatoModel.create(req.body, (contato, err) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(201).json({ message: 'Contato inserido com sucesso', data: contato })
            }
        })
    }

    update(req, res) {
        ContatoModel.updateOne({ _id: req.params.id }, { $set: req.body }, (contato, err) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).json({ message: 'Contato atualizado com sucesso', data: contato })
            }
        })
    }
}

module.exports = new Contato()