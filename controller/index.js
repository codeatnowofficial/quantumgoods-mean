const { set } = require("mongoose")
const { categorySchema } = require("../schema/categories.schema")
const { productSchema } = require("../schema/productSchema.schema")
const { userschema } = require("../schema/userschema.schema")
const uploadToCloudinary = require("../utils/index")
const { subcategoryschema } = require("../schema/subCatagories.schema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { google } = require('googleapis')
const e = require("express")

const findByUser = async (req, res) => {
    console.log("done")
    // console.log(db)
    try {
        const user_username_check = await userschema
            .findOne({ username: req.body.username })
        console.log(user_username_check)
        if (user_username_check) {
            console.log("user exist")
            return 1
        } else {
            return 0
        }
    } catch (error) {
        res.json(error)
    }
}
const findByEmail = async (req, res) => {
    console.log("done")
    // console.log(db)
    try {
        const user_email_check = await userschema
            .findOne({ email: req.body.email })
        console.log(user_email_check)
        if (user_email_check) {
            console.log("email exist")
            return user_email_check
        } else {
            // res.json({status:"user not found"})
            console.log("email not exist")
            return 0
        }
    } catch (error) {
        res.json(error)
    }
}
exports.signup = async (req, res) => {
    console.log("done")

    // console.log(db)
    try {
        const findUser = await findByUser(req, res)
        console.log("user check", findUser)
        const findemail = await findByEmail(req, res)
        console.log("email check", findemail)
        if (!findemail) {
            bcrypt.hash(req.body.password, 10).then((hashedpassword) => {
                const insertOneUser = new userschema({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedpassword
                })
                insertOneUser.save()
                if (insertOneUser) {
                    res.json({ status: 1 })
                } else {
                    res.json({ status: 0 })
                }
            })
        } else {
            res.json({ status: "email exist" })
        }

        // hash password check

        //     bcrypt.hash(req.body.password,10)
        //    .then(hashedpassword  => {
        //     console.log(hashedpassword)
        //        const user = new userschema({
        //            username:req.body.username,
        //            email:req.body.email,
        //            password:hashedpassword
        //        })
        //        const cs = user.save()
        //        if(cs){
        //            res.json({message:"Saved Succcessfully"})
        //        }else{
        //         res.json({message:"not saved succesfully!!!"})
        //        }
        //     })

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

exports.getUser = async (request, response) => {
    console.log(request.body)
    try {
        const secretKey = "fullsecret"
        const expiresinHours = 24
        const expirationTime = Math.floor(Date.now() / 1000) + (60 * 60 * expiresinHours);
        const token = jwt.sign({
            exp: expirationTime,
            data: request.body.email
        }, secretKey);
        console.log("this is the token", token)
        let findemail = await findByEmail(request)
        if (findemail) {
            console.log(findemail.password)
            bcrypt.compare(request.body.password, findemail.password, function (err, result) {
                if (err) {
                    response.json({ status: 'password not match' })
                }
                if (result) {
                    response.json({ status: 1, token: token, userid: findemail._id })
                } else {
                    response.json({ status: 'password not match' })
                }
            })
        } else {
            response.json({ status: 0 })
        }

        // bcrypt password check

    } catch (error) {
        response.json(error)
    }

}

exports.categories = async (request, response) => {
    try {
        categorySchema.find().then((data) => response.json(data))
        // console.log(cat_list)
    } catch (error) {
        response.json({ error: error })
    }
}

exports.addProduct = async (req, res) => {
    try {
        const image = await req.file;
        const body = await req.body
        const cloudinary_save = await uploadToCloudinary.uploadToCloudinary(image.path)
        if (cloudinary_save != false) {
            const addProduct = new productSchema({
                'product_name': body.product_name,
                'uid': body.uid,
                'product_price': body.product_price,
                'product_image': cloudinary_save,
                'product_description': body.product_description,
                'product_category': body.product_category,
                'product_subcategory': body.product_subcategory
            })
            const product_save = await addProduct.save()
            // console.log(product_save)
            res.json({ status: 1 })
        } else {
            res.json({ status: 0 })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.getAllProduct = async (request, response) => {
    console.log("response")
    // response.json({status:1})
    const products = await productSchema.find()
    response.json(products).status(200)
}

exports.addcategories = async (request, response) => {
    const addcategory = new categorySchema({
        category: request.body.category_name
    })
    await addcategory.save()
    if (addcategory) {
        response.json({ status: 1 })
    } else {
        response.json({ status: 0 })
    }
    //    const addcategory = new categorySchema({
    //     category:req.body.categories_name
    //    })
    // const addCategory = new categorySchema({})
}

exports.getcategories = async (request, response) => {
    console.log(request)
    const categories = await categorySchema.find()
    response.json(categories)
}

exports.removecategories = async (request, response) => {
    try {
        const removecategory = await categorySchema.deleteOne({ _id: request.body.id })
        if (removecategory) {
            response.json({ status: 1 })
        } else {
            response.json({ status: 0 })
        }
    } catch (error) {
        console.log(error);
        response.json({ error })
    }
}

exports.getcategorybyid = async (request, response) => {
    try {
        const getCategory = await categorySchema.findOne({ _id: request.body.id })
        console.log(getCategory)
        response.json(getCategory)
    } catch (error) {
        response.json(error)
    }
}

exports.updatecategory = async (request, response) => {
    try {
        const updateCategory = await categorySchema.updateOne({ _id: request.body._id }, { $set: { category: request.body.cat } })
        console.log(updateCategory)
        if (updateCategory) {
            response.json({ status: 1 })
        } else {
            response.json({ status: 0 })
        }
    } catch (error) {
        response.json({ error: error })
    }
}

exports.addsubcategory = async (request, response) => {
    try {
        const addsub = new subcategoryschema({
            category: request.body.category_name,
            subcategory: request.body.subcategory_name
        })
        const newsub = addsub.save()
        if (newsub) {
            response.json({ status: 1 })
        } else {
            response.json({ status: 0 })
        }
    } catch (error) {
        response.json({ error: error })
    }
}

exports.getsubcategoryFromCategory = async (request, response) => {
    try {
        console.log(request.body)
        const getsub = await subcategoryschema.find({ category: request.body.category })
        response.json({ sub: getsub })
    } catch (error) {
        response.json({ error: error })
    }
}

exports.getallsub = async (request, response) => {
    try {
        const getallsub = await subcategoryschema.find()
        response.json(getallsub)
    } catch (error) {
        response.json({ error: error })
    }

}
exports.removesubcategory = async (request, response) => {
    try {
        const deletesub = await subcategoryschema.deleteOne({ _id: request.body._id })
        if (deletesub) {
            response.json({ status: 1 })
        } else {
            response.json({ status: 0 })
        }
    } catch (error) {
        response.json({ error: error })
    }
}

exports.updatesub = async (request, response) => {
    try {
        console.log(request.body)
        const updatesubCategory = await subcategoryschema.updateOne({ _id: request.body._id }, { $set: { subcategory: request.body.subcategory } })
        console.log(updatesubCategory)
        if (updatesubCategory) {
            response.json({ status: 1 })
        } else {
            response.json({ status: 0 })
        }
    } catch (error) {
        response.json({ error: error })
    }
}

exports.getsubcategoryfromname = async (request, response) => {
    try {
        const name = request.body.name
        const result = await subcategoryschema.find({ category: name })
        if (result) {
            response.json(result)
        } else {
            response.json({ status: 0 })
        }
    } catch (error) {
        response.json(error)
    }
}

exports.getproductsbyid = async (request, response) => {
    const getallproducts = await productSchema.find({ uid: request.body._id })
    response.json(getallproducts)
}

exports.forgotpassword = async (request, response) => {
    console.log(request.body.email)

    const finduser = await userschema.findOne({ email: request.body.email })
    if (finduser) {
        console.log(true)
        let token

        const generateToken = () => {
            token = crypto.randomBytes(3).toString('hex');
            return token
        };

        OAuth2 = google.auth.OAuth2,
            oauth2Client = new OAuth2(
                "54483711494-n1o0gbouug9qqtectts3u4tmkb865osk.apps.googleusercontent.com",
                "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",
                "https://developers.google.com/oauthplayground"
            );
        oauth2Client.setCredentials({
            refresh_token:
                "1//04QV3zkUuyFyrCgYIARAAGAQSNwF-L9IrLcGzgfXW3ARQcW-NOMMaF3oCsI5pEr7acA5VgBWH9S13acXNRgQY5X91QXuZ8rNnBuo",
        });

        const accessToken = oauth2Client.getAccessToken(),
            transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "quantumgoods.shopping@gmail.com",
                    clientId:
                        "576279600249-a59lck3322shafgj5eum33ota326lkkd.apps.googleusercontent.com",
                    clientSecret: "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",
                    refreshToken:
                        "1//04HvdFt8PfcEsCgYIARAAGAQSNwF-L9IrcBMZLYcyV96ISUR0G1_8x7wy92QNUkIZghQ7aGTD5yUCn2Bl02MoCB0feonKeIyuI38",
                    accessToken: accessToken,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            }),
            mailOptions = {
                from: "quantumgoods.shopping@gmail.com",
                to: request.body.email,
                subject: "Verify Link for QuantumGoods",
            };

        const send = async () => {
            generateToken();
            mailOptions.text = 'Please Enter The Following Code For Password Update - ' + token
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    response.json({ status: 0 })
                } else {
                    console.log("Email sent: " + info.response);
                    response.json({ code: token, status: 1 })
                }
            });
        };
        send()
    } else {
        response.json({ message: 'user not found' })
    }
}

exports.forgotpasswordupdate = async (request, response) => {
    try {
        bcrypt.hash(request.body.password, 10).then(async (hashedpassword) => {
            let findemail = await findByEmail(request)
            if (findemail) {
                console.log(findemail.password)
                bcrypt.compare(request.body.password, findemail.password, async (err, result) => {
                    if (result) {
                        response.json({ status: 0, message:'password already exist' })
                    } else {
                        const updatePassword = await userschema.updateOne({ email: request.body.email }, { $set: { password: hashedpassword } })
                        console.log(updatePassword)
                        if (updatePassword.modifiedCount > 0) {
                            return response.json({ status: 1,message:'password not exist' })
                        } else {
                            response.json({ status: 0 })
                        }
                    }
                })
            } else {
                response.json({ status: 0,message:'email not found' })
            }
        })
    } catch (error) {
        response.json(error)
    }
}