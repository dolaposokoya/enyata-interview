const { createUserWithEmailAndPassword } = require("firebase/auth");
const { firebaseAuth, database } = require("../firebase.config");
const { set, ref, push, child } = require("firebase/database");
const orderSchema = require("../models/order.model");


const createOrder = async (req, res) => {
    try {
        const { order_name, billing_address, quantity, price } = req.body
        const currentUser = req.user
        if (currentUser && currentUser?._id) {
            if (order_name && billing_address && quantity && price) {
                const total = parseFloat(price) * parseFloat(quantity)
                const order = new orderSchema(req.body)
                order.total = parseFloat(total)
                order.user_id = currentUser?._id
                order.date_ordered = new Date().getTime()
                const response = await order.save()
                if (response && response?._id) {
                    res.status(200).json({ message: 'Order created', success: true, payload: response, })
                }
                else {
                    res.status(400).json({ message: 'Unable to create order', success: false })
                }
            }
            else {
                res.status(400).json({ message: 'Some fields are empty', success: false })
            }
        }
        else {
            res.status(401).json({ message: 'Unauthorized access', success: false })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

const getCustmerOrders = async (req, res, next) => {
    try {
        const currentUser = req.user
        if (currentUser && currentUser?._id) {
            const { limit, page } = req.query;
            const options = {
                page: page || 1,
                limit: limit || 5,
                sort: {
                    createdAt: -1,
                },
            };
            const response = await orderSchema.paginate({ user_id: currentUser?._id }, options);
            if (response) {
                const { totalDocs, totalPages, pagingCounter, prevPage, nextPage, docs } = response
                const payload = {
                    orders: docs,
                    totalDocs, limit: response.limit, totalPages, page: response.page, pagingCounter, prevPage, nextPage
                };
                res.status(200).json({ message: 'Order retrieved', success: true, payload: payload, })
            }
            else {
                res.status(400).json({ message: 'Unable to get order', success: false })
            }
        } else {
            res.status(401).json({ message: 'Unauthorized access', success: false })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

const filterCustmerOrders = async (req, res, next) => {
    try {
        const currentUser = req.user
        const { limit, page, price, asc } = req.query;
        if (currentUser && currentUser?._id) {
            const user_id = currentUser?._id?.toString()
            console.log('currentUser', user_id)
            const response = await orderSchema.find({ user_id: user_id, price: { $gte: parseInt(price) } })
            // const response = asc === true ? await orderSchema.find({ price: { $gte: parseInt(price) } }) : await orderSchema.find({ price: { $lt: parseInt(price) } });
            if (response) {
                // res.status(200).json({ message: 'Order retrieved', success: true, payload: payload})
                res.status(200).json({ message: 'Order retrieved', success: true, payload: response })
            }
            else {
                res.status(400).json({ message: 'Unable to get order', success: false })
            }
        } else {
            res.status(401).json({ message: 'Unauthorized access', success: false })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

module.exports = {
    createOrder,
    getCustmerOrders,
    filterCustmerOrders
}