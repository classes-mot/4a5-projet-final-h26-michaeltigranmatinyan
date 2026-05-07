import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export const Post = mongoose.model('Post', postSchema);
