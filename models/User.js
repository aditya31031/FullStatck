const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'receptionist'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    children: [{
        name: { type: String, required: true },
        lastName: { type: String }, // Optional Last Name
        age: { type: Number, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
        bloodGroup: { type: String },
        weight: { type: String },
        height: { type: String },
        photo: { type: String },
        vaccinations: [{
            name: String,
            dateGiven: { type: Date, default: Date.now },
            status: { type: String, enum: ['completed', 'pending', 'skipped'], default: 'completed' },
            notes: String
        }]
    }],
    resetPasswordExpire: Date
});

// Helper to capitalize words
const capitalize = (str) => {
    if (!str) return str;
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

// Pre-save hook to capitalize names
UserSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.name = capitalize(this.name);
    }
    if (this.isModified('children')) {
        this.children.forEach(child => {
            child.name = capitalize(child.name);
        });
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
