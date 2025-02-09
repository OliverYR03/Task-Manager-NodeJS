import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

export const connectDB = async () => {
    try{
    await mongoose.connect(process.env.DB_URL)
    console.log('>>>>>>> Database connected')   
    } catch (e) {
        console.error(e)
    }
   
}