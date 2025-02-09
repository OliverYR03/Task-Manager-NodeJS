import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            default: 'Not Started',
        },
        priority: {
            type: String,
            default: 'Low', 
        },
        img: {
            type: String,
            default:""
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Task", taskSchema)