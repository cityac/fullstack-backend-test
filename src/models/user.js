const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require('validator')
// const Post = require('./post')

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    trim: true,
  },
  username: {
    type: Schema.Types.String,
    trim: true,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
        }
    }
  },

  phone: {
    type: Schema.Types.String,
    trim: true,
  },
  website: {
    type: Schema.Types.String,
    validate(value) {
      if (!validator.isURL(value)) {
          throw new Error('URL is invalid')
      }
  }
},


// address: {
//   street: "Kulas Light",
//   suite: "Apt. 556",
//   city: "Gwenborough",
//   zipcode: "92998-3874",
//   geo: {
//     lat: "-37.3159",
//     lng: "81.1496"
//   }
// },

});

userSchema.statics.adaptData = (data) => {
  const user = new User(data);
  user._id = mongoose.Types.ObjectId();
  // delete user.address;
  return user;
}

userSchema.statics.bulkInsert = (users) => {
 User.collection.insertMany(users);
}

const User = mongoose.model('User', userSchema)

module.exports = User;
