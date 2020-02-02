const { Schema, model } = require("mongoose")

const TransparenciaSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        maxlength: 150,
        trim: true
    },
    descricao: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    data: {
        type: Date,
        required: true
    },
    pdf: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
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
module.exports = model('transparenciaSchema', TransparenciaSchema)