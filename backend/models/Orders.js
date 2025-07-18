const mongoose = require('mongoose');
// 1. Define OrderSchema

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model('orders', OrderSchema);