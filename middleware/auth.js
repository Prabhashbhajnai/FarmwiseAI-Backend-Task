import jwt from 'jsonwebtoken'

const authenticateJWT = async (req, res, next) => {
    const token = req.header('authorization')

    if (!token)
        return res.status(401).json({ success: false, message: "Unauthorized" })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ success: false, message: "Forbidden" })

        req.user = user
        next()
    })
}

export default authenticateJWT