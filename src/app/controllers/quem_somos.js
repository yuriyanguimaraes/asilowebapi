const mongoose = require('mongoose')
const QuemSomosModel = require('./../models/quem_somos')

class QuemSomos {

    get(req, res) {
        QuemSomosModel.find({}, (err, quemSomos) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Dados recuperados com sucesso', data: quemSomos })
            }
        })
    }

    create(req, res) {
        QuemSomosModel.create(req.body, (err, quemSomos) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Quem Somos inserido com sucesso', data: quemSomos })
            }
        })
    }

    update(req, res) {
        QuemSomosModel.updateOne({ _id: req.params.id }, { $set: req.body }, (err, quemSomos) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Quem Somos atualizado com sucesso', data: quemSomos })
            }
        })
    }

    delete(req, res) {
        QuemSomosModel.deleteOne({ _id: req.params.id }, (err, quemSomos) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Quem Somos apagado com sucesso', data: quemSomos })
            }
        })
    }
}

module.exports = new QuemSomos()