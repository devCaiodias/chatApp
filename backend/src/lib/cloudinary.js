import {v2 as cloudinary} from 'cloudinary';

import {config} from "dotenv"

config()

cloudinary.config({
    cloud_name: process.env.CLOUDIRINARY_CLOUD_NAME,
    api_key: process.env.CLOUDIRINARY_API_KEY,
    api_secret: process.env.CLOUDIRINARY_API_SECRET
})

export default cloudinary