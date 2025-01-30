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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status', 
            required: true
        },
        priority: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Priority', 
            required: true, 
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Task", taskSchema)