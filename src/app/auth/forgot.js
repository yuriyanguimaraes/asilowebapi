const mongoose = require('mongoose')
const fs = require('fs')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const handlebars = require('handlebars')
const nodemailer = require('nodemailer')
const UsuarioSchema = require('./../models/usuario')
const ResetPassSchema = require('./../models/resetar_senha')

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

exports.sendMailForgot = function (req, res) {
    const email = req.body.email

    UsuarioSchema.findOne({ email: email }, (err, usuario) => {
        if (err) {
            res.status(500).json({ message: 'Houve um erro ao processar sua requisição' })
        } else {
            if (!usuario) {
                res.status(422).json({ message: 'E-mail não encontrado' })
            } else {
                const token = crypto.randomBytes(20).toString('hex')
                ResetPassSchema.create({ email: email, token: token }, (err) => {
                    if (err) {
                        res.status(442).json({ message: 'Tivemos um problema ao processar sua operação. Tente novamente mais tarde' })
                    } else {
                        readHTMLFile(__dirname + '/templates/forgot-pass.html', function (err, html) {
                            if (err) {
                                console.log(`Erro ao ler HTML => ${err}`)
                                res.status(500).json({ message: 'Houve um erro ao processar sua requisição! Tente novamente mais tarde' })
                            }
                            var template = handlebars.compile(html)
                            var replacements = {
                                url: process.env.MESSENGER_URL + token,
                                NAME: usuario.nome
                            }
                            var htmlToSend = template(replacements)
                            var mailOptions = {
                                to: email,
                                from: process.env.MESSENGER_MAIL,
                                html: htmlToSend,
                                subject: 'Redefinição de senha | Asilo Web'
                            }
                            smtpTransport.sendMail(mailOptions, function (err) {
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

exports.resetAndDefineNewPass = function (req, res) {
    const token = req.params.token
    const id = req.body.id
    const newPassword = req.body.password
    const confirmNewPassword = req.body.confirmPassword

    ResetPassSchema.findOne({ token: token }, async (err, reset) => {
        if (err) {
            res.status(500).json({ message: 'Houve um erro ao processar sua requisição' })
        } else {
            if (!reset) {
                res.status(422).json({ message: 'Não encontramos um pedido de redefinição de senha! Tente novamente' })
            } else {
                if (newPassword === confirmNewPassword) {
                    JSON.stringify(newPassword)
                    const salt = await bcrypt.genSaltSync(10)
                    hashPassword = await bcrypt.hash(newPassword, salt)
                    UsuarioSchema.findByIdAndUpdate({ _id: id }, { $set: { senha: hashPassword } }, (err, usuario) => {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ message: 'Houve um erro ao processar sua requisição' })
                        } else {
                            if (!usuario) {
                                res.status(422).json({ message: 'Ocorreu um erro' })
                            } else {
                                readHTMLFile(__dirname + '/templates/reset-success.html', function (err, html) {
                                    if (err) {
                                        res.status(500).json({ message: 'Houve um erro ao processar sua requisição! Tente novamente mais tarde' })
                                    }
                                    var template = handlebars.compile(html)
                                    var replacements = {
                                        name: usuario.nome
                                    }
                                    var htmlToSend = template(replacements)
                                    var mailOptions = {
                                        to: usuario.email,
                                        from: process.env.MESSENGER_MAIL,
                                        html: htmlToSend,
                                        subject: 'Redefinimos a sua senha | Asilo Web'
                                    }
                                    smtpTransport.sendMail(mailOptions, function (err) {
                                        if (err) {
                                            res.status(442).json({ message: 'Serviço Indisponível' })
                                        } else {
                                            res.status(200).json({ message: 'Senha redefinida com sucesso' })
                                            ResetPassSchema.findByIdAndUpdate({ _id: id }, { $set: { isValid: 0 } }, (err) => {
                                                console.log(`Erro ao invalidar token de redefinição de senha => ${err}`)
                                            })
                                        }
                                    })
                                })
                            }
                        }
                    })
                }
            }
        }
    })
}