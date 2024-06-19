import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    bio: {
        type: String
    },
    skills: [String],
    experience: [{
        company: String,
        role: String,
        startDate: Date,
        endDate: Date
    }]
}, { timestamps: true });

const User = model('User', userSchema);

export default User;
