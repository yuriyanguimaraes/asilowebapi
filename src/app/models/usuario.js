const { Schema, model } = require("mongoose")

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
        timestamps: false
    }
)
module.exports = model('usuarioSchema', UsuarioSchema)