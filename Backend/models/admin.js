const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminId: {type: mongoose.Types.ObjectId},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true}
});

adminSchema.pre('save', function () {
    if (! this.adminId) {
        this.adminId = this._id;
    }
});

const admin = mongoose.model('admin', adminSchema);

module.exports = admin;