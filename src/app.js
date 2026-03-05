const express = require('express')
const authRoutes = require('./routes/auth.routes')
const errorHandler = require('./middleware/errorMw')

const app = express();
app.use(express.json())


app.use('/api',authRoutes)
app.use(errorHandler)

module.exports = app;