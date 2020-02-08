const { Schema, model } = require("mongoose")

const noticiaSchema = new Schema({
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
    date: {
        type: Date,
        required: true
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
module.exports = model('noticiaSchema', noticiaSchema)