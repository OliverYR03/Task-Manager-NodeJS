import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    }
})
statusSchema.index({ title: 1 }, { unique: true });
export default mongoose.model("Status", statusSchema)


