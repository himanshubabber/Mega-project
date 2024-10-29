 class ApiError extends Error{
    constructor(
    statuscode,
    message= "something went wrong",
    error= [],
    stack= " "
    ){
      super(message)
      this.statuscode= statuscode,
      this.data= null,
      this.message= message,
      this.success= false,
      this.erros= errors
      
      if(statck){
        this.stack= statck
      }
      else{
        Error.capturestackTrace( this, this.constructor)
      }
    }
 }

 export {ApiError}