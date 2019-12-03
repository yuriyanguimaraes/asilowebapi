const mongoose = require('mongoose')
const FaqSchema = require('./../models/faq')

class Faq {

    get(req, res) {
        FaqSchema.find({}, (err, faq) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Dados recuperados com sucesso', data: faq })
            }
        })
    }

    create(req, res) {
        FaqSchema.create(req.body, (err, faq) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'FAQ inserido com sucesso', data: faq })
            }
        })
    }

    update(req, res) {
        FaqSchema.updateOne({ _id: req.params.id }, { $set: req.body }, (err, faq) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'FAQ atualizado com sucesso', data: faq })
            }
        })
    }

    delete(req, res) {
        FaqSchema.deleteOne({ _id: req.params.id }, (err, faq) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'FAQ apagado com sucesso', data: faq })
            }
        })
    }
}

module.exports = new Faq()