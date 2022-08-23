import app from './app.js'
import { config } from 'dotenv'
import './database/database.js'
config()

const port = process.env.PORT || 4000

app.listen(port, () => {
  try {
    console.log(`server on port ${port}`)
  } catch (err) {
    console.log(err)
  }
})
