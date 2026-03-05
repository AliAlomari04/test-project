const db = require('../seed/seed')
const {comparePassword} = require('../utils/passwordUtil')
const {generateAccessToken , generateRefreshToken , verifyRefreshToken } = require('../utils/jwtUtil')


 const login = async (req,res,next) => {
    try {
        console.log("DATA: ",  req.body);
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Missing data.."})
        }

        const user = await db.findUserByEmail(email)
        console.log("USER: " , user);
        
        if(!user){
            return res.status(401).json({message:"Invalid email or password"})
        }

        const isMatch = await comparePassword(password , user.password)
        console.log("password match: " , isMatch);
        
        if(!isMatch){
            return res.status(401).json({message:"Invalid email or password"})
        }
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        await db.updateRefreshToken(user.id , refreshToken)

        res.json({message:"Entered successfully" , accessToken , refreshToken})
    } catch (error) {
        next(error)
    }
}

 const refresh = async (req,res,next) => {
    try {
        const {refreshToken} = req.body;
        if(!refreshToken) return res.status(401).json({error:"No token provided!"})
            console.log("Token sent from postman:" , refreshToken);
            

            const user = await db.findUserByRefreshToken(refreshToken);
            if(!user) return res.status(403).json({error:"Invaild token!"})

                verifyRefreshToken(refreshToken)

            const newAccessToken = generateAccessToken(user)

            res.json({accessToken: newAccessToken})
    } catch (error) {
        next(error)
    }
}

module.exports = {login , refresh}