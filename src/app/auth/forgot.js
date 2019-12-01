const mongoose = require('mongoose')
const fs = require('fs')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const handlebars = require('handlebars')
const nodemailer = require('nodemailer')
const UsuarioModel = require('./../models/usuario')
const ResetPassModel = require('./../models/resetar_senha')

const readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err
        } else {
            callback(null, html)
        }
    })
}

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MESSENGER_MAIL,
        pass: process.env.MESSENGER_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendMailForgot = (req, res, next) => {
    const email = req.body.email

    UsuarioModel.findOne({ email: email }, (err, usuario) => {
        if (err) {
            res.status(500).json({ message: 'Houve um erro ao processar sua requisição' })
        } else {
            if (!usuario) {
                res.status(422).json({ message: 'E-mail não encontrado' })
            } else {
                const token = crypto.randomBytes(20).toString('hex')
                ResetPassModel.create({ email: email, token: token }, (err, resetPass) => {
                    if (err) {
                        res.status(442).json({ message: 'Tivemos um problema ao processar sua operação. Tente novamente mais tarde' })
                    } else {
                        readHTMLFile(__dirname + '/templates/forgot-pass.html', function (err, html) {
                            var template = handlebars.compile(html)
                            var replacements = {
                                url: process.env.MESSENGER_URL,
                                NAME: usuario.nome
                            }
                            var htmlToSend = template(replacements)
                            var mailOptions = {
                                to: email,
                                from: process.env.MESSENGER_MAIL,
                                html: htmlToSend,
                                subject: 'Redefinição de senha | Asilo Web'
                            }
                            smtpTransport.sendMail(mailOptions, function (err, info) {
                                if (err) {
                                    console.log(err)
                                    res.status(442).json({ message: 'Serviço Indisponível' })
                                } else {
                                    res.status(200).json({ message: 'E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada' })
                                }
                            })
                        })
                    }
                })
            }
        }
    })
}