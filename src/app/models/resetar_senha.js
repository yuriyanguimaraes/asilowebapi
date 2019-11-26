const { Schema, model } = require("mongoose")

const RestarSenhaSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    token: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = model('restarSenhaSchema', RestarSenhaSchema)