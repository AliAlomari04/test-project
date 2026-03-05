const { hashPassword } = require('../utils/passwordUtil')

let users = [];

 const initSeed = async () => {
    const hashedPassword = await hashPassword('password123');
    users.push({
        id:1 ,
        email:"admin@test.com",
        password:hashedPassword,
        refreshToken: null
    })
   
    console.log("Admin seeded..");
    
}

 const findUserByEmail = async (email) => {
    console.log("db's content: " , users);
    
    return users.find(u=> u.email === email)
}
 const findUserByRefreshToken = async (token) => {
   return users.find(u=> u.refreshToken === token)
}
 const updateRefreshToken = async (userId , token) => {
    const userIndex = users.findIndex(u=> u.id === userId)
    if(userIndex > -1) users[userIndex].refreshToken = token;
}

module.exports= {initSeed,findUserByEmail , findUserByEmail  , updateRefreshToken , findUserByRefreshToken}