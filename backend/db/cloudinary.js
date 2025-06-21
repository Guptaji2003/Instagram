const { v2 :cloudinary }=require("cloudinary");
const dotenv =require("dotenv");
dotenv.config({});

if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    console.error("❌ Cloudinary environment variables are missing!");
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
module.exports= cloudinary;