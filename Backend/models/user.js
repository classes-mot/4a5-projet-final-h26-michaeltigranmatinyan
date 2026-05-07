import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    phoneNumber: { type: String, required: false }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
