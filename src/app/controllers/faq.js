const mongoose = require('mongoose')
const FaqModel = require('./../models/faq')

class Faq {

    get(req, res) {
        FaqModel.find({}, (err, faq) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Dados recuperados com sucesso', data: faq })
            }
        })
    }

    create(req, res) {
        FaqModel.create(req.body, (err, faq) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'FAQ inserido com sucesso', data: faq })
            }
        })
    }

    update(req, res) {
        FaqModel.updateOne({ _id: req.params.id }, { $set: req.body }, (err, faq) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'FAQ atualizado com sucesso', data: faq })
            }
        })
    }

    delete(req, res) {
        FaqModel.deleteOne({ _id: req.params.id }, (err, faq) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'FAQ apagado com sucesso', data: faq })
            }
        })
    }
}

module.exports = new Faq()