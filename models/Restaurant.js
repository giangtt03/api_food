const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    title: {type: String, require: true},
    time: {type: String, require: true},
    imageUrl: {type: String, require: true},
    foods: {type: Array},
    pickup: {type: Boolean, require: false, default: true},
    delivery: {type: Boolean, require: false, default: true},
    owner: {type: String, require: true},
    isAvaiable: {type: Boolean, require: true},
    code: {type: String, require: true},
    logoUrl: {
        type :String,
        require: true,
        default: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png'
    },
    rating: {type: Number, min: 1, max: 5},
    ratingCount: {type: String},
    coords: {
        id: {type: String, require: true},
        latitude: {type: Number, require: true},
        longtitude: {type: Number, require: true},
        latitudeDelta: {type: Number, require: true, default: 0.0222},
        longtitudeDelta: {type: Number, require: true, default: 0.0221},
        address: {type: String, require: true},
        title: {type: String, require: true}
    }

},{timestamps: true});

module.exports = mongoose.model('Restaurant', restaurantSchema);