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
        enum: ['Faculty Advisor','Admin', 'Core Member', 'Member'] 
    },
    password: {
        type: String,
        select: false // Prevents password hash from being sent in default queries
    },
    portfolio: {
        type: String,
        required: true,
        enum: ['Events & Docs', 'Technical', 'Marketing', 'Design'] 
    },
    batch: { type: Number, required: true },
    branch: { 
        type: String, 
        required: true,
        enum: ['Computer Science and Engineering', 'Electronics and Telecommunication Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Instrumentation and Control Engineering', 'Manufacturing Engineering', 'Metallurgy and Material Engineering', 'Planning'],
    },
    joinedDate: { type: Date, required: true, default: Date.now },
    expertise: { type: [String] }, 
    photo: { type: String , trim: true}, 
    contactNumber: { type: String },
    
    socials: {
        linkedin: { type: String },
        github: { type: String },
        email: { type: String },
    },

}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);
export default Member;
