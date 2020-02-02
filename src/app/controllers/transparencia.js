const mongoose = require('mongoose')
const TransparenciaSchema = require('./../models/transparencia')

class Transparencia {

    get(req, res) {
        TransparenciaSchema.find({}, (err, transparencia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Dados recuperados com sucesso', data: transparencia })
            }
        })
    }

    getByCategory(req, res) {
        let category = req.params.category.replace(/%20/g, " ")

        TransparenciaSchema.find({ categoria: { $eq: category } }, (err, transparencia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Transparência recuperado com sucesso', data: transparencia })
            }
        })
    }

    getById(req, res) {
        TransparenciaSchema.findById(req.params.id, (err, transparencia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Transparência recuperado com sucesso', data: transparencia })
            }
        })
    }

    create(req, res) {
        TransparenciaSchema.create(req.body, (err, transparencia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Transparência inserido com sucesso', data: transparencia })
            }
        })
    }

    update(req, res) {
        TransparenciaSchema.updateOne({ _id: req.params.id }, { $set: req.body }, (err, transparencia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Transparência atualizado com sucesso', data: transparencia })
            }
        })
    }

    delete(req, res) {
        TransparenciaSchema.deleteOne({ _id: req.params.id }, (err, transparencia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Transparência apagado com sucesso', data: transparencia })
            }
        })
    }
}

module.exports = new Transparencia()