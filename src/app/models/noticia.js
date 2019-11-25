const { Schema, model } = require("mongoose")

const NoticiaSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        maxlength: 150,
        trim: true
    },
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    imagem: {
        type: Array,
        required: false,
    },
    categoria: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 4,
        trim: true
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
        timestamps: true
    }
)
module.exports = model('noticiaSchema', NoticiaSchema)