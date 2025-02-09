import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'https://task-manager-nodejs-bvjh.onrender.com/',
    'https://task-manager-react-iz4u.onrender.com/',
    'http://localhost:1234',
    'http://localhost:5173'

  ]

export const corsMiddleware = (acceptedOrigins = ACCEPTED_ORIGINS) => cors({
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
