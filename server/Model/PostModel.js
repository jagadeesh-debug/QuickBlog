import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

export default mongoose.model("Post", PostSchema);