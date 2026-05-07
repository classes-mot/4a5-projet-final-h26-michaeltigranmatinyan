import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true, enum: ['Trade', 'buy'] },
    category: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
