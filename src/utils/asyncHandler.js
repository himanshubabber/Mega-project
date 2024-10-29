
//const asyncHandler= () = () // function me function dalna 

// const asyncHandler= (fn) = async(res, res, next)=>{
//   try{
//     await fn(req, res, next)
//   }
//   catch(error){
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message
//     })
//   }
// }


// promises wala code 
const asyncHandler = (requestHandler)=>{
  (req, res, next) =>{
    promise.resolve(requestHandler(req, res, next))
    .catch(err =>next(err));
  }
}



export {asyncHandler}