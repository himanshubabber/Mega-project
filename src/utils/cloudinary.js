import {v2 as cloudinary} from "cloudinary"
// just name diya hn aur kuch nhi cloudinary v2 ko
import fs from  "fs" // file system import kara hn 


   
    // hm ye sab custom change bhi kar sakte hn 
    //setting me se jake 

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET 
    });

    const uploadOnCloudinary = async (localFilePath) => {
      try{
        if(!localFilePath) return null
        // upload the file on cloudinary
        const response= await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto" // ki image hn ya pdf ese
        })
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);
        return response;

      }catch( error ){
        // file ko hta do
        fs.unlinkSync(localFilePath) // remove locally saved temp file as the upload operation got failed 
        return null;
      }
    }

    export {uploadOnCloudinary}

    
   