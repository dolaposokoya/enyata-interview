const UserShcema = require("../models/user.model");
const { encryptPassword, deCryptPassword } = require("../utilities/password.utilities");
const { generateToken } = require("../utilities/authorization.utilities");

const createCustomer = async (req, res) => {
    try {
        const { email, password, name } = req.body
        if (email && password && name) {
            const user = new UserShcema(req.body)
            const hashed = await encryptPassword(password)
            user.email = email.toLowerCase()
            if (hashed && hashed?.success === true) {
                user.password = hashed?.hash
                const response = await user.save()
                if (response && response?._id) {
                    res.status(200).json({ message: 'Account created', success: true, payload: response })
                }
                else {
                    res.status(400).json({ message: 'Something went wrong', success: false })
                }
            }
            else {
                res.status(400).json({ message: 'Something went wrong', success: false })
            }
        }
        else {
            res.status(400).json({ message: 'Some fields are empty', success: false })
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.status(500).json({ message: errorMessage, success: false, errorCode })
    }
}

const loginCustomer = async (req, res) => {
    try {
        let { email, password } = req.body
        email = email.toLowerCase()
        if (email && password) {
            const response = await UserShcema.findOne({ email: email })
            if (response && response?.email === email) {
                const dehashed = await deCryptPassword(password, response.password)
                if (dehashed && dehashed.success === true) {
                    const { token, message, success } = await generateToken(response.email, response._id)
                    if (success !== false) {
                        const payload = { email: response?.email, _id: response._id, name: response?.name, token }
                        res.status(200).json({ message: 'Login successful', success: true, payload })
                    }
                    else {
                        res.status(400).json({ message: message || "Error occured", success: false })
                    }
                }
                else {
                    res.status(400).json({ message: "Email or password doesn't match", success: false })
                }
            }
            else {
                res.status(400).json({ message: 'User not found', success: false })
            }
        }
        else {
            res.status(400).json({ message: 'Some fields are empty', success: false })
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.status(500).json({ message: errorMessage, success: false, errorCode })
    }
}

module.exports = {
    createCustomer,
    loginCustomer
}