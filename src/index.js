require('dotenv').config();
const express = require('express')
const app = require('./app')
const {initSeed} = require('./seed/seed')



const PORT = process.env.PORT || 3000;
initSeed().then(()=>{
app.listen(PORT , ()=>{
    console.log(`App running on port : ${PORT}`);
})
})