const { Schema, model } = require("mongoose")
const bcrypt = require('bcrypt')

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    senha: {
        type: String,
        required: true,
        trim: true,
        maxlength: 60
    },
    status: {
        type: Boolean,
        trim: true,
        maxlength: 1,
        default: 1
    }
},
    {
        versionKey: false,
        timestamps: false,
    }
)

UsuarioSchema.pre("save", function (next) {
    const user = this

    if (user.senha === undefined) {
        return next()
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            console.log(err)
        } else {
            bcrypt.hash(user.senha, salt, function (err, hash) {
                if (err) {
                    console.log(err)
                } else {
                    user.senha = hash
                    next()
                }
            })
        }
    })
})

module.exports = model('usuarioSchema', UsuarioSchema)