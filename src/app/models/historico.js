const { Schema, model } = require("mongoose")

const HistoricoSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    descricao: {
        type: String,
        required: true,
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
module.exports = model('historicoSchema', HistoricoSchema)