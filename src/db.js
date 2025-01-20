import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
    await mongoose.connect('mongodb://localhost:/tdodb')
    console.log('>>>>>>> Database connected')   
    } catch (e) {
        console.error(e)
    }
   
}