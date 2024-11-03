import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {
  return res.status(200).json({ // jaha pe send karna hn postman pe dekhega green color me
    message: "himanshu and code"
  }) // response diya hn 
  
})

export {registerUser}
