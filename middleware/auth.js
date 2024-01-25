import jwt from 'jsonwebtoken'

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.header('Authorization')


    if (!authHeader)
        return res.status(401).json({ success: false, message: "Unauthorized: Not Logged In" })

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ success: false, message: "Forbidden: Invalid Token" })

        req.user = user
        next()
    })
}

export default authenticateJWT