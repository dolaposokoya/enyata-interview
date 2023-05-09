const User = require('../models/user.model')
const token = require('../utilities/authorization.utilities')



const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).json({ message: 'Unauthorized Access', success: false })
        }
        else {
            const userToken = req.headers.authorization.split(' ')[1];
            if (userToken) {
                const legit = await token.checkToken(userToken)
                if (legit.success === true) {
                    req.user = legit.user_token
                    const response = await User.findById({ _id: req.user._id })
                    if (response) {
                        next();
                    }
                    else {
                        res.status(400).json({ message: 'No user found with that credentials', success: false })
                    }
                }
                else {
                    res.status(400).json({ message: 'User can not be verified', success: false })
                }
            }
            else {
                res.status(403).json({ message: 'User can not be verified', success: false })
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}


module.exports = {
    verifyToken,
}