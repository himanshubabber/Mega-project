 import express from "express"

 import cors from "cors"
 import cookieParser from "cookie-parser"
 import bodyParser from "body-parser"

 const app=express()

 
 app.use(express.json());

 app.use(bodyParser.json({ limit: '10mb' })); 
 app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

 app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
 } ))

 app.use(express.json({limit: " 16mb"}))

 app.use(express.urlencoded({
  extended: true,
  limit: "16mb"
 }))
 app.use(express.static("public"))// kuch files , pdf , images ko public kar sake 
 app.use(cookieParser())


      //  routes
      // routes es tarah import kiya jata hn 

      import userRouter from "./routes/user.routes.js"

      // routes declaration 

    //  app.use("/users",userRouter); not standard practice 

      // url kese banaega 
      // https://localhost:8000/users/register
      // alag alag method banalo user.routes me 

      // standard practice
      app.use("/api/v1/users", userRouter );




 export {app}
