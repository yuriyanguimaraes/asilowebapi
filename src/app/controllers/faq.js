const mongoose = require('mongoose')
const FaqSchema = require('./../models/faq')

class Faq {

    getFaqWithParams(req, res) {

        const limit = 10

        let query = {}
        let page = req.query.page
        let skip = limit * (page - 1)
        let { columnSort, valueSort } = req.query



        FaqSchema
            .find(query)
            .sort([[ columnSort, valueSort ]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                } else if (Array.isArray(data) && data.length == 0) {
                    res.status(404).json({ message: 'Não foram encontrados dados para os termos da pesquisa! Tente pesquisar novamente' })
                } else {
                    FaqSchema
                        .estimatedDocumentCount()
                        .find(query)
                        .exec((err, count) => {
                            let totalDocuments = count.length
                            if (err) {
                                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                            } else {
                                res.status(200).json({
                                    message: 'Dados recuperados com sucesso',
                                    data: data,
                                    page: page,
                                    limit: limit,
                                    count: totalDocuments
                                })
                            }
                        })
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