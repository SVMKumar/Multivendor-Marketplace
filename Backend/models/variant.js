const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    size: {type: String, required: true},
    color: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
});

const variants = mongoose.model("variant", variantSchema);

module.exports = variants;