let mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    profileImageUrl:{type:String,default:'https://res.cloudinary.com/diizmtj04/image/upload/v1751293061/default-pic_kl5jwr.avif'},
    role: {
      type: String,
      enum: ['admin','client'],
      default: 'client'
    },
    username: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
    }
  }
) 

let userModel = mongoose.model('users', userSchema)

module.exports = userModel
