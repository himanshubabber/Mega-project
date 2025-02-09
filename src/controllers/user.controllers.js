import {asyncHandler} from "../utils/asyncHandler.js"

import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


  const generateAccessAndRefreshToken= async (userId) =>{
    try {
        const accessToken= User.generateAccessToken()
        const refreshToken= User.generateRefreshToken() 

      User.refreshToken=  refreshToken
      await User.Save({validateBeforeSave: false})

      return {accessToken , refreshToken}


    } catch (error) {
       
      throw new ApiError(500, "something went wrong while generating the refresh and access token")
    }

  }




const registerUser = asyncHandler(async (req, res) => {
  /*
return res.status(200).json({ jaha pe send karna hn postman pe dekhega green color me
  message: "himanshu and code"
  })  response diya hn  */

      // 1)get user details from frontend
      //2) validation (kahi username empty bhej diya ho)- like that
      // 3)check if user already exist username, email
      //4) check for images and check for avatar
      // 5)upload to cloudinary, check for avatar
      //6) create user object- create entry in db
      // 7) remove password and refresh token field from response (user ko ye nhi bhejna chahata)
      // remove password and refresh token field from response
      //8) check for user creation 
      //9) return res


    //destructural of res.body
    const {user_name,fullname, email, password}= req.body
    console.log("email: ", email);
    
    //  if(fullname== "") {
    //   throw new ApiError(400, "fullname is required") 
    // }
    console.log("Request Body:", req.body);

   if(
       [user_name,fullname, email, password].some((field) => field?.trim() === "")
    ){
       throw new ApiError(400, "All field are required")
    }
     
    //3)
   const existedUser= await User.findOne({
      $or: [{ user_name}, {email}] // koi ek bhi match kare toh
    })
 
    if(existedUser){
    throw new ApiError(409, "User with email or username already exit")
    }
   // console.log(existedUser)

    //4)
      const avatarLocalPath = req.files?.avatar[0]?.path;

  
      const coverImageLocalPath =req.files?.coverImage[0]?.path;

      if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
      }
       // not complusion of coverimage so we can skip it
     /* if(!coverImageLocalPath){
        throw new ApiError(400, "Cover image  is required")
      }*/

       // 5) upload on cloudinary
       
      const avatar = await uploadOnCloudinary(avatarLocalPath)
      // time lagta hn 
      const coverImage = await uploadOnCloudinary(coverImageLocalPath)
      
      if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
      }
     console.log(avatar);
       //6)
     const newUser = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      user_name: user_name ? user_name.toLowerCase() : ""
    });
    console.log(newUser)
   //7)
   const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
   // jo jo nhi chahiye
    
    //8)
    if(!createdUser){
      throw new ApiError(500, "something went wrong while registering the user")
    }

    //9)

    return res.status(201).json(
      new ApiResponse(200, createdUser,"User registered Successfully")
    )

})

  
const loginUser= asyncHandler( async (req,res)=> {
  // pahele req.body se data lelo
 const  {email, password, user_name} = req.body
   
 //validate the user 
  if(!user_name || !email) {
    throw new ApiError(400,"user_name or email is required ")
  }
  
  // find the user 
  const user = User.findOne({
    $or: [{user_name , email}]
  })

  if(!user){
    throw new ApiError(404, "User doesn't exit")
  }

  const isPasswordValid=User.isPasswordCorrect(password)

  if(!isPasswordValid){
    throw new ApiError(401,"Invalid user credentials")
  }
  
  // generate refresh and access token 
  const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInUser= await user.findById(user._id).
  select("-password -refreshtoken")
  
   const options = {
    httponly: true,
    secure: true
   }

   return res.status(200).
   cookie("accessToken",accessToken,options).
   cookie("refreshToken",refreshToken,options)
   .json(
    new ApiResponse(
      200,
      {
        user: loggedInUser, accessToken, refreshToken
      },

      "user logged in successfully"
    )
   )


 }

)

const logOutUser =asyncHandler(async (req, res)=>{
  await  User.findByIdAndUpdate(
    req.user._id,
    {
      $set : {
        refreshToken : undefined
      }
    },
    {
      new: true
    }
   )

   const options = {
    httponly: true,
    secure: true
   }

   return res.status(200)
   .clearCookie("accessToken").
   clearCookie("refreshToken")
   .json(new ApiResponse(200,{},"user logged out succcessfully"))

})

export {registerUser,loginUser, logOutUser}
