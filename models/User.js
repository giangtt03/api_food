const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    uid: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    address: {type: Array, require: false},
    phone: {type: String, require: false},
    userType: {type: String, require: true, default: "", enum: ['Admin','Driver', 'Client', 'Vendor']},
    profile: {
        type :String,
        require: true,
        default: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png'

    }


},{timestamps: true});

module.exports = mongoose.model('User', UserSchema);