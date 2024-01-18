const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    }
})

exports.subcategoryschema = mongoose.model('sub-category',subCategorySchema)