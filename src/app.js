import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import ipRoutes from './routes/ip.routes.js'

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(helmet())

// routes
app.use(ipRoutes)

export default app
