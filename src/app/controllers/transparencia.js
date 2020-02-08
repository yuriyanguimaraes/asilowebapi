const TransparenciaSchema = require('./../models/transparencia')

class Transparencia {

    getWithParams(req, res) {

        const limit = 10

        let query = {}
        let page = req.query.page
        let skip = limit * (page - 1)
        let { category, dateStart, dateFinish, order } = req.query

        if (category) {
            query['categoria'] = new RegExp(category, "i")
        }

        if (dateStart && dateFinish) {
            query['data'] = { $gte: new Date(dateStart), $lte: new Date(dateFinish) }
        }

        if (dateStart && !dateFinish) {
            dateFinish = Date.now()
            query['data'] = { $gte: new Date(dateStart), $lte: new Date(dateFinish) }
        }

        TransparenciaSchema
            .find(query)
            .sort({ data: order })
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                }
                else if (Array.isArray(data) && data.length == 0) {
                    res.status(404).json({ message: 'Não foram encontrados dados para os termos da pesquisa! Tente pesquisar novamente' })
                } else {
                    TransparenciaSchema
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
                                    count: totalDocuments,
                                })
                            }
                        })
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