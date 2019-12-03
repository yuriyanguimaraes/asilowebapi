const mongoose = require('mongoose')
const HistoricoSchema = require('./../models/historico')

class Historico {

    get(req, res) {
        HistoricoSchema.find({}, (err, historico) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Dados recuperados com sucesso', data: historico })
            }
        })
    }

    create(req, res) {
        HistoricoSchema.create(req.body, (err, historico) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Historico inserido com sucesso', data: historico })
            }
        })
    }

    update(req, res) {
        HistoricoSchema.updateOne({ _id: req.params.id }, { $set: req.body }, (err, historico) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Historico atualizado com sucesso', data: historico })
            }
        })
    }

    delete(req, res) {
        HistoricoSchema.deleteOne({ _id: req.params.id }, (err, historico) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Historico apagado com sucesso', data: historico })
            }
        })
    }
}

module.exports = new Historico()