import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const { MONGO_URI } = process.env

const dbConnection = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('db connected')
  })
  .catch(err => {
    console.log(err)
  })

process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})

export default dbConnection
