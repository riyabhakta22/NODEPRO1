const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true
    },
    productimage : {
        type : String
    },
    subCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategories'
    }

}, { timestamps: true })

module.exports = mongoose.model('products', productSchema)