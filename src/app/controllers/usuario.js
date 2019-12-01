const mongoose = require('mongoose')
const UsuarioModel = require('./../models/usuario')

class Usuario {

    get(req, res) {
        UsuarioModel.find({}, (err, usuario) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Dados recuperados com sucesso', data: usuario })
            }
        })
    }

    getById(req, res) {
        UsuarioModel.findById(req.params.id, (err, usuario) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Usuário recuperado com sucesso', data: usuario })
            }
        })
    }

    create(req, res) {
        UsuarioModel.create(req.body, (err, usuario) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Usuário inserido com sucesso', data: usuario })
            }
        })
    }

    update(req, res) {
        UsuarioModel.updateOne({ _id: req.params.id }, { $set: req.body }, (err, usuario) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Usuário atualizado com sucesso', data: usuario })
            }
        })
    }

    delete(req, res) {
        UsuarioModel.deleteOne({ _id: req.params.id }, (err, usuario) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Usuário apagado com sucesso', data: usuario })
            }
        })
    }
}

module.exports = new Usuario()