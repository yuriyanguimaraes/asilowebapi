const noticiaSchema = require('./../models/noticia')

class Noticia {

    getWithParams(req, res) {

        const limit = 6

        let query = {}
        let page = req.query.page
        let skip = limit * (page - 1)
        let { dateStart, dateFinish, order } = req.query

        if (dateStart && dateFinish) {
            query['date'] = { $gte: new Date(dateStart), $lte: new Date(dateFinish) }
        }

        if (dateStart && !dateFinish) {
            dateFinish = Date.now()
            query['date'] = { $gte: new Date(dateStart), $lte: new Date(dateFinish) }
        }

        noticiaSchema
            .find(query)
            .sort({ date: order })
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                } else if (Array.isArray(data) && data.length == 0) {
                    res.status(404).json({ message: 'Não foram encontrados dados para os termos da pesquisa! Tente pesquisar novamente' })
                } else {
                    noticiaSchema
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

    getNoticiaById(req, res) {
        noticiaSchema.findById(req.params._id, (err, noticia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Noticia recuperada com sucesso', data: noticia })
            }
        })
    }

    getThreeResults(req, res) {
        noticiaSchema.find({}, (err, noticia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Dados recuperados com sucesso', data: noticia })
            }
        }).limit(3).sort({ data: -1 });
    }

    getNoticiaByTitle(req, res) {
        let title = req.params.title.replace(/%20/g, " ")

        noticiaSchema.findOne({ titulo: { $eq: title } }, (err, noticia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Noticia recuperada com sucesso', data: noticia })
            }
        })
    }

    create(req, res) {
        noticiaSchema.create(req.body, (err, noticia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Noticia inserida com sucesso', data: noticia })
            }
        })
    }

    update(req, res) {
        noticiaSchema.updateOne({ _id: req.params.id }, { $set: req.body }, (err, noticia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Noticia atualizada com sucesso', data: noticia })
            }
        })
    }

    delete(req, res) {
        noticiaSchema.deleteOne({ _id: req.params.id }, (err, noticia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Noticia apagada com sucesso', data: noticia })
            }
        })
    }
}

module.exports = new Noticia()
