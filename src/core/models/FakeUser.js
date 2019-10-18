const mongoose = require('mongoose')

const FakeUserSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   created: {
      type: Date,
      default: Date.now
   }
})

module.exports = mongoose.model('fakeUser', FakeUserSchema)