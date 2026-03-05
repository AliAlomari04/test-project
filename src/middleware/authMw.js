const {verifyAccessToken} = require('../utils/jwtUtil')

 const protectRoute = (req,res,next)=>{
    try {
        const authHeader = req.headers['authorization'];
        if(!authHeader?.startsWith('Bearer ')){
            return res.status(401).json({message:"Not allowed!"})
        }

        const token = authHeader.split(' ')[1]
        const decoded = verifyAccessToken(token)

        req.user = decoded;
        next()
    } catch (error) {
        return res.status(403).json({error:error.message})
    }
}

module.exports = {protectRoute}