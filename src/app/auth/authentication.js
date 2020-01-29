const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsuarioSchema = require('./../models/usuario')

const handleAuthentication = (req, res) => {
    const email = req.body.email
    const pass = req.body.password

    UsuarioSchema.findOne({ email: email }, (err, usuario) => {
        if (err) {
            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
        } else {
            if (!usuario) {
                res.status(403).json({ message: 'Dados inválidos! Tente novamente' })
            }

            bcrypt.compare(pass, usuario.senha, function (err, result) {
                if (err) {
                    res.status(401).json({ message: "Houve um erro no processo de autenticação! Tente novamente" })
                } else {
                    const token = jwt.sign({
                        sub: email,
                        iss: "asiloweb-api"
                    }, process.env.AUTH_SECRET)
                    res.status(200).json({ message: "Dados autenticados com sucesso", acessToken: token })
                }
            })
        }
    })
}

module.exports = handleAuthentication