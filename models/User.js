const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: String,
    photoURL: {
      type: String,
      default:
        'https://res.cloudinary.com/diurivj/image/upload/v1550195172/Repaso/_user_profile_icon_1108089.png',
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = mongoose.model('User', userSchema)
