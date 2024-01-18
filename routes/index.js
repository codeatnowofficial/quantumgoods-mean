const express = require("express");
const {
	signup,
	getUser,
	categories,
	addProduct,
	getAllProduct,
	addcategories,
	getcategories,
	removecategories,
	getcategorybyid,
	updatecategory,
	addsubcategory,
	getsubcategoryFromCategory,
	getallsub,
	removesubcategory,
	updatesub,
	getsubcategoryfromname,
	getproductsbyid,
	forgotpassword,
	forgotpasswordupdate
} = require("../controller");
const { upload } = require("../middleware/multer.middleware");
const router = express.Router();
const { verify } = require("../middleware/jwtAuth.middleware");

router
	.post("/signup", signup)
	.post("/getusers", getUser)
	.get("/categories",verify(), categories)
	.post('/addproduct', upload.single('image'), addProduct)
	.get('/allproduct', verify(), getAllProduct)
	.get('/getcategories', verify(), getcategories)
	.post('/addcategories', verify(), addcategories)
	.post('/removecategories', verify(), removecategories)
	.post('/getcategorybyid', verify(), getcategorybyid)
	.post('/updatecategory', verify(), updatecategory)
	.post('/addsubcategory', verify(), addsubcategory)
	.post('/getsubcategoryFromCategory', verify(), getsubcategoryFromCategory)
	.get('/getallsub', verify(), getallsub)
	.post('/removesubcategory', verify(), removesubcategory)
	.post('/updatesub', verify(), updatesub)
	.post('/getsubcategoryfromname', verify(), getsubcategoryfromname)
	.post('/getproductsbyid',getproductsbyid)
	.post('/forgotpassword',forgotpassword)
	.post('/forgotpasswordupdate',forgotpasswordupdate)

exports.route = router;