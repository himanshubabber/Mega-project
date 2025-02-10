import dotenv from "dotenv"

import connectDB from "../db/index.js"
import { app } from "../app.js";

dotenv.config({
    path: "./env"
})

connectDB()

.then(() => {
    // Start the server
    app.listen(process.env.PORT || 8001, () => {
      console.log(`Server is running at PORT: ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed !!!", error);
  });


