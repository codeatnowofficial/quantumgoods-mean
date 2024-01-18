const mongoose = require('mongoose')

const category = new mongoose.Schema({
    category:{
        type:String
    }
})

exports.categorySchema = mongoose.model('products_categories',category)

// {
//     "_id": {
//       "$oid": "6593c24241dea9c888416c10"
//     },
//     "categories": {
//       "Computer": [
//         "Computer Component",
//         "Computer Accessories",
//         "Data Storage"
//       ],
//       "Health And Household": [
//         "Health Care",
//         "Household Supply",
//         "Wellness And Relaxation"
//       ],
//       "Automative": [
//         "Car Care",
//         "Tools And Equipments",
//         "Car Accessories"
//       ]
//     }
//   }