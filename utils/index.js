const nodemailer = require('nodemailer');
const crypto = require('crypto');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dypwngj89',
    api_key: '293147826789297',
    api_secret: 'jOyYr_O6O-KaxyT0xdtDmXaTZ3s'
})

exports.uploadToCloudinary = async (localpath) => {
    try {
        if(!localpath) return null

        const response = await cloudinary.uploader.upload(localpath,{
            resource_type:"auto"
        })
        console.log("file is uploaded to cloudinary")
        return response.url
    } catch (error) {
        return false
    }
}
