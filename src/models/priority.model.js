import mongoose from "mongoose";

const prioritySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    collection: "Priority" 
});

export default mongoose.model("Priority", prioritySchema);
