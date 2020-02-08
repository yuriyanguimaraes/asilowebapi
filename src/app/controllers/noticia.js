const noticiaSchema = require('./../models/noticia')

class Noticia {

    get(req, res) {
        noticiaSchema.find({}, (err, noticia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Dados recuperados com sucesso', data: noticia })
            }
        }).sort([['date', -1]])
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
