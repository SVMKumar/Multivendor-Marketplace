const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentType: {type: String, enum: ["UPI", "BankTransfer", "Paypal"], required: true},
    recipientHandle: {type: String, required: true}
});

const vendorSchema = new mongoose.Schema({
    vendorId: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    storeName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    status: {type: String, required: true, default: "Pending", enum: ["Pending", "Suspended", "Active"]},
    address: {type: String, required: true},
    password: {type: String, required: true},
    paymentMethods: {type: [paymentSchema], required: true},
    rating: {type: Number, required: true, default: 0, min: 0, max: 5},
    joinedOn: {type: Date, required: true, default: Date.now}
});

vendorSchema.pre('save', function () {
    if (!this.vendorId) {
      this.vendorId = this._id;
    }
  });  

const vendor = mongoose.model("vendor", vendorSchema);

module.exports = vendor;