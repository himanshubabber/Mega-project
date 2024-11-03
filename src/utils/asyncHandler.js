
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
// high order function 
const asyncHandler = (requestHandler)=>{
 return  (req, res, next) =>{
    Promise.resolve(requestHandler(req, res, next))
    .catch(err =>next(err));
  }
}



export {asyncHandler}