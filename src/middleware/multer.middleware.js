import multer from "multer"


// cb call back
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')// yaha path dedo 
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname)
  }
})

 export const upload = multer({ storage, })