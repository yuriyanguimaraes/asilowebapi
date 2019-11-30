const { Schema, model } = require("mongoose")

const ContatoSchema = new Schema({
    rua: {
        type: String,
        required: true,
        maxlength: 100
    },
    bairro: {
        type: String,
        required: true,
        maxlength: 100
    },
    numero: {
        type: Number,
        required: true,
        maxlength: 20
    },
    cep: {
        type: String,
        required: true,
        maxlength: 20
    },
    complemento: {
        type: String,
        required: false,
        maxlength: 100
    },
    cidade: {
        type: String,
        required: true,
        maxlength: 100
    },
    telefone: {
        type: Array,
        required: false,
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
module.exports = model('contatoSchema', ContatoSchema)