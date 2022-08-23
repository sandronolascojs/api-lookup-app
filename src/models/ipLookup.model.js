import { Schema, model } from 'mongoose'
import '../database/database.js'

const ipLookupSchema = new Schema({
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

const IpLookup = model('ipLookup', ipLookupSchema)

export default IpLookup
