import { Schema, model } from 'mongoose'
import '../database/database.js'

const ipVisitorSchema = new Schema({
  ip: String,
  ipType: String,
  provider: String,
  companyType: String,
  city: String,
  region: String,
  country: String,
  flagCountry: String
}, {
  timestamps: true,
  versionKey: false
})

const IpVisitor = model('ipVisitor', ipVisitorSchema)

export default IpVisitor
