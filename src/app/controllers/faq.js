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

    }

    update(req, res) {

    }

    delete(req, res) {

    }
}

module.exports = new Faq()