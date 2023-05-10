const mongoose = require('mongoose');
const UserModel = require('./user.model');
const Schema = mongoose.Schema;
const paginate = require('mongoose-paginate-v2')

const orderSchema = new Schema({
    order_name: { type: String },
    billing_address: { type: String},
    quantity: { type: String },
    price: { type: Number },
    total: { type: String },
    date_ordered: { type: Date },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
}, {
    versionKey: false,
    timestamps: true
});

orderSchema.plugin(paginate);
const order = mongoose.model('order', orderSchema)

module.exports = order
