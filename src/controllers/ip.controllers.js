import requestIp from 'request-ip'
import { config } from 'dotenv'
import axios from 'axios'
import IpVisitor from '../models/ipVisitor.model.js'
import IpLookup from '../models/ipLookup.model.js'

config()

const { RAPIDAPI_KEY } = process.env

// visitor lookup
export const getIp = async (req, res) => {
  try {
    const reqIp = requestIp.getClientIp(req)

    const uriIpData = 'https://ip-geolocation-and-threat-detection.p.rapidapi.com/'

    const ipData = await axios.request(uriIpData + reqIp, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com'
      }
    }).then(function (res) {
      return res.data
    }).catch(function (err) {
      console.log(err)
    })

    const uriWeatherApi = 'https://weatherapi-com.p.rapidapi.com/current.json'

    const weatherData = await axios.request(uriWeatherApi, {
      params: { q: reqIp },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    }).then(function (res) {
      return res.data
    }).catch(function (err) {
      console.log(err)
    })

    // destructuring IP info
    const {
      ip,
      type,
      company,
      connection,
      location,
      security
    } = ipData

    // destructuring weather info
    const {
      current
    } = weatherData

    const ipObject = [{
      ipData: {
        ip,
        ipType: type,
        provider: company.name === null ? connection.organization : company.name,
        companyType: company.type.toUpperCase(),
        city: location.city,
        coordinates: {
          latitude: location.latitude,
          longitude: location.longitude
        },
        postal: location.postal,
        region: location.region.name,
        country: location.country.name,
        flagCountry: location.country.flag.noto,
        continent: location.continent.name,
        security: {
          abuser: security.is_abuser,
          anonymous: security.is_anonymous,
          attacker: security.is_attacker,
          cloudProvider: security.is_cloud_provider,
          proxy: security.is_proxy,
          relay: security.is_relay,
          threat: security.is_threat,
          vpn: security.is_vpn
        }
      },
      weatherData: {
        current: {
          temperature: {
            temp_c: current.temp_c,
            temp_f: current.temp_f
          },
          condition: {
            text: current.condition.text,
            icon: current.condition.icon
          },
          humidity: current.humidity + '%'
        }
      }
    }
    ]

    const visitorData = {
      ip: ipObject[0].ipData.ip,
      ipType: ipObject[0].ipData.ipType,
      provider: ipObject[0].ipData.provider,
      companyType: ipObject[0].ipData.companyType,
      city: ipObject[0].ipData.city,
      region: ipObject[0].ipData.region,
      country: ipObject[0].ipData.country,
      flagCountry: ipObject[0].ipData.flagCountry

    }
    const visitor = new IpVisitor(visitorData)
    await visitor.save()

    res.status(200).json(ipObject)
  } catch (err) {
    console.log(err)
  }
}

// ip lookup
export const ipLookup = async (req, res) => {
  try {
    const { reqIp } = req.body

    const uriIpData = 'https://ip-geolocation-and-threat-detection.p.rapidapi.com/'

    const ipData = await axios.request(uriIpData + reqIp, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com'
      }
    }).then(function (res) {
      return res.data
    }).catch(function (err) {
      console.log(err)
    })

    const uriWeatherApi = 'https://weatherapi-com.p.rapidapi.com/current.json'

    const weatherData = await axios.request(uriWeatherApi, {
      params: { q: reqIp },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    }).then(function (res) {
      return res.data
    }).catch(function (err) {
      console.log(err)
    })

    // destructuring IP info
    const {
      ip,
      type,
      company,
      connection,
      location,
      security
    } = ipData

    // destructuring weather info
    const {
      current
    } = weatherData

    const ipObject = [{
      ipData: {
        ip,
        ipType: type,
        provider: company.name === null ? connection.organization : company.name,
        companyType: company.type.toUpperCase(),
        city: location.city,
        coordinates: {
          latitude: location.latitude,
          longitude: location.longitude
        },
        postal: location.postal,
        region: location.region.name,
        country: location.country.name,
        flagCountry: location.country.flag.noto,
        continent: location.continent.name,
        security: {
          abuser: security.is_abuser,
          anonymous: security.is_anonymous,
          attacker: security.is_attacker,
          cloudProvider: security.is_cloud_provider,
          proxy: security.is_proxy,
          relay: security.is_relay,
          threat: security.is_threat,
          vpn: security.is_vpn
        }
      },
      weatherData: {
        current: {
          temperature: {
            temp_c: current.temp_c,
            temp_f: current.temp_f
          },
          condition: {
            text: current.condition.text,
            icon: current.condition.icon
          },
          humidity: current.humidity + '%'
        }
      }
    }
    ]

    if (reqIp !== '35.162.239.193') {
      const lookupData = {
        ip: ipObject[0].ipData.ip,
        ipType: ipObject[0].ipData.ipType,
        provider: ipObject[0].ipData.provider,
        companyType: ipObject[0].ipData.companyType,
        city: ipObject[0].ipData.city,
        region: ipObject[0].ipData.region,
        country: ipObject[0].ipData.country,
        flagCountry: ipObject[0].ipData.flagCountry

      }
      const lookup = new IpLookup(lookupData)
      await lookup.save()
    }

    res.status(200).json(ipObject)
  } catch (err) {
    console.log(err)
  }
}

export const getLastVisitors = async (req, res) => {
  try {
    const data = await IpVisitor.find().sort({ _id: -1 }).limit(5)
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
  }
}

export const getLastLookups = async (req, res) => {
  try {
    const data = await IpLookup.find().sort({ _id: -1 }).limit(5)
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
  }
}
