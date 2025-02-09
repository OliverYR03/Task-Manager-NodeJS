import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { corsMiddleware } from './middlewares/cors.js'

import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'

export const app = express()

export const port = process.env.PORT ?? 1234

app.use(morgan('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())
app.use(corsMiddleware())

app.use('/api/',    authRoutes)
app.use('/api/',    taskRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

