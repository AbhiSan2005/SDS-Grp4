import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Head', 'Member'] // Example roles
    },
    portfolio: {
        type: String,
        required: true,
        enum: ['Events & Docs', 'Technical', 'Marketing', 'Design'] // Example portfolios
    },
    batch: { type: Number, required: true },
    branch: { type: String, required: true },
    joinedDate: { type: Date, required: true, default: Date.now },
    expertise: { type: [String] }, 
    location: { type: String, required: true },
    photo: { type: String }, 
    contactNumber: { type: String },
    
    socials: {
        linkedin: { type: String },
        github: { type: String },
        email: { type: String },
    },

}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);
export default Member;
