const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log(token)
        if (!token) {
            return res.redirect('/user/login')
        }

        const secret = "secret_Key"

        try {
            const payload = jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    
                    return res.redirect('/user/login')
                }
                return decoded
            })

            if (!payload) {
                return res.redirect('/user/login')
            }

            const user = await userModel.findById(payload.sub)
            console.log(user)
            if (!user) {
                return res.redirect('/user/login')
            }

            req.user = user;
            req.role = payload.role;
            next()
        } catch (error) {
            return res.redirect('/user/login');
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error while verifying token',
            success: false
        })
    }
}
module.exports = authenticate