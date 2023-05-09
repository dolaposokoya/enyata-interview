const bcrypt = require('bcrypt')
const saltRounds = 15;

const encryptPassword = async (data) => {
    try {
        const hash = await bcrypt.hash(data, saltRounds);
        if (hash) {
            return {
                hash,
                success: true
            }
        }
        else {
            return {
                message: 'Something went wrong',
                success: false
            }
        }
    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

const deCryptPassword = async (password, hash) => {
    try {
        const match = await bcrypt.compare(password, hash)
        if (match) {
            return {
                match,
                success: true
            }
        }
        else {
            return {
                message: "Password doesn't match",
                success: false
            }
        }
    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}

module.exports = {
    encryptPassword,
    deCryptPassword
}

