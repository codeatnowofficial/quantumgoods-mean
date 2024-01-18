const express = require('express')
const cors = require('cors')
const { route } = require('./routes');
const mongoose = require('mongoose');
const app = express()
app.use(cors())
app.use(express.json({limit:'50mb'}))
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

// multer code 
// const express = require('express')


// app.post('/addproduct', upload.single('file'), function (req, res, next) {
//   // req.file is the `avatar` file
//   console.log("hello")
//   console.log(req.file,req.body)
//   // req.body will hold the text fields, if there were any
// })






mongoose.connect('mongodb://127.0.0.1:27017/quantumGoods').then(() => {
    console.log("connected succesfully")
    app.listen(4000, () => {
        console.log('server started at 4000')
    })
}).catch(err => console.log(err))



// app.use((req,res) =>{
//     req.db = getDb();
// })

// let db
// connectDb((err) => {
//     if (!err) {
//         app.listen(4000, () => {
//             console.log("Connected to database")
//             console.log("Port is Listening on 4000")
//         })
//         db = getDb()
//     }
// })

app.use(route)
