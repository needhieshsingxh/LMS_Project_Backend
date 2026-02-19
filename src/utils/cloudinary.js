import {v2 as cloudinary} from 'cloudinary'
import dotenv from "dotenv"

dotnev.config({})



cloudinary.config({
    api_key: process.env.API_KEY,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.API_SECRET
})

export const uploadMedia = async (file) =>{
    try{
        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        })
        return uploadResponse
    }catch(error){
            console.log("Error in uploading media to cloudinary")
            console.err(error)
    }
}

export const deleteMediaFromCloud  = async (publicId) =>{
    try{
            await cloudinary.uploader.destroy(publicId)
    }
    catch(error){
        console.log("Failed to delete MEDIA from cloudinary")
        console.error(error)
    }
}

export const deleteVideoFromCloud  = async (publicId) =>{
    try{
            await cloudinary.uploader.destroy(publicId, {resource_type: "video"})
    }
    catch(error){
        console.log("Failed to delete Video from cloudinary")
        console.error(error)
    }
}