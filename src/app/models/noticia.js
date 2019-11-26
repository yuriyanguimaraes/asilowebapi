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
    },
    imagem: {
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
        timestamps: true
    }
)
module.exports = model('noticiaSchema', NoticiaSchema)