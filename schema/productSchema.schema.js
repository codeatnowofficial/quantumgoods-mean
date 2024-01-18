const mongoose = require('mongoose')

const product = new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    
    uid:{
        type:String,
        required:true
    },
    product_price:{
        type:Number,
        required:true
    },
    product_image:{
        type:String,
    },
    product_description:{
        type:String,
        required:true
    },
    product_category:{
        type:String,
        required:true
    },
    product_subcategory:{
        type:String,
    }
})

exports.productSchema = new mongoose.model('products_data',product)

// {
//     "_id": {
//       "$oid": "6593bd4741dea9c888416c0e"
//     },
//     "product_name": "Mouse",
//     "product_image": "name.jpg",
//     "product_description": "xyz",
//     "procuct_category": {
//       "Computer": [
//         "Computer Component",
//         "Accessories"
//       ]
//     },
//     "date": "02 january, 2024"
//   }