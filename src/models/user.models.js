import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema ( {
   
  user_name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  fullname: {
    type: String,
    required: true,
    trim: true,
    index: true
  },

  avatar: {
    type: String,
    required: true
  },

  coverImage: {
    type:String
  },

  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video"
    }
  ],

  password: {
    type: String,
    required: [ true, 'password is required']
  },

  referenceToken: {
    type: String
  }

},{
  timestamps: true
})

// encryption of password
userSchema.pre("save", async function (next) {
  if(!this.isModified("password"))  return next();

  this.password = await  bcrypt.hash(this.password, 10)
  next()
})

// user custom methods 
userSchema.methods.isPasswordCorrect = async function(password){
 return  await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (){
  jwt.sign(
    {
      _id: this._ide,
      email: this.email,
      username: this.username,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken = function (){
  jwt.sign(
    {
      _id: this._ide,
      
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
       expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}





export const User= mongoose.model("User", userSchema)
