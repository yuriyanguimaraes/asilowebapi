const { Schema, model } = require("mongoose")

const FaqSchema = new Schema({
    pergunta: {
        type: String,
        required: true,
        trim: true
    },
    resposta: {
        type: String,
        required: true,
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
module.exports = model('faqSchema', FaqSchema)