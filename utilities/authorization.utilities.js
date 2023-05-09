const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
const jwtAlgorithm = "HS256";

module.exports = {
    async checkToken(token) {
        try {
            if (token === '' || token === undefined || token === null) {
                return {
                    success: false
                }
            } else {
                return {
                    user_token: jwt.verify(token, JWT_SECRET),
                    success: true
                };
            }
        } catch (error) {
            return {
                message: error?.message,
                success: false
            }
        }
    },

    async generateToken(email, _id) {
        try {
            const token = jwt.sign({ email: email, _id: _id }, JWT_SECRET.toString(), { algorithm: jwtAlgorithm, expiresIn: JWT_EXPIRES_IN, subject: _id.toString() })
            if (token) {
                return {
                    token: token,
                    success: true,
                    message: 'Token generated'
                }
            } else {
                return {
                    success: false,
                    token: '',
                    message: 'No token generated'
                }
            }
        } catch (error) {
            return {
                success: false,
                token: '',
                message: error.message
            };
        }
    },
}

