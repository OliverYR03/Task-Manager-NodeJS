import cors from 'cors'

const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS
  

export const corsMiddleware = (acceptedOrigins = ACCEPTED_ORIGINS.parse(",")) => cors({
    origin: (origin, callback) => {
        if (ACCEPTED_ORIGINS.includes(origin)) {
          return callback(null, true)
        }
    
        if (!origin) {
          return callback(null, true)
        }
    
        return callback(new Error('Not allowed by CORS'))
      },
      credentials: true
})
