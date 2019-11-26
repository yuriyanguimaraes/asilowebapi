const { Schema, model } = require("mongoose")

const TransparenciaSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        maxlength: 150,
        trim: true
    },
    pdf: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
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
module.exports = model('transparenciaSchema', TransparenciaSchema)