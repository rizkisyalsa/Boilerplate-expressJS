const mongoose = require('mongoose')
const config = require("../configs")
const { logger } = require("../../core/logger")

const connectDB = async () => {
   try {
      await mongoose.connect(config.mongoURI, {
         useNewUrlParser: true,
         useCreateIndex: true,
         useUnifiedTopology: true,
         useFindAndModify: false
      })
      logger.info('MongoDB connected')
   } catch (err) {
      logger.info(err.message)
      process.exit(1)
   }
}

module.exports = connectDB