const mongoose = require('mongoose')
const ContatoSchema = require('./../models/contato')

class Contato {

    get(req, res) {
        ContatoSchema.find({}, (err, contato) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Dados recuperados com sucesso', data: contato })
            }
        })
    }

    create(req, res) {
        ContatoSchema.create(req.body, (err, contato) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Contato inserido com sucesso', data: contato })
            }
        })
    }

    update(req, res) {
        ContatoSchema.updateOne({ _id: req.params.id }, { $set: req.body }, (err, contato) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Contato atualizado com sucesso', data: contato })
            }
        })
    }

    delete(req, res) {
        ContatoSchema.deleteOne({ _id: req.params.id }, (err, contato) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Contato apagado com sucesso', data: contato })
            }
        })
    }
}

module.exports = new Contato()