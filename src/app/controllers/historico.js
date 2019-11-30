const mongoose = require('mongoose')
const HistoricoModel = require('./../models/historico')

class Historico {

    get(req, res) {
        HistoricoModel.find({}, (err, historico) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Dados recuperados com sucesso', data: historico })
            }
        })
    }

    create(req, res) {
        HistoricoModel.create(req.body, (err, historico) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Historico inserido com sucesso', data: historico })
            }
        })
    }

    update(req, res) {
        HistoricoModel.updateOne({ _id: req.params.id }, { $set: req.body }, (err, historico) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Historico atualizado com sucesso', data: historico })
            }
        })
    }

    delete(req, res) {
        HistoricoModel.deleteOne({ _id: req.params.id }, (err, historico) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Historico apagado com sucesso', data: historico })
            }
        })
    }
}

module.exports = new Historico()