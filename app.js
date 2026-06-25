const dotenv = require('dotenv');
const express = require("express");
const app = express()
const authRouter = require('./routes/authRoutes.js')
const cors = require('cors')
const path = require('path')
const { auth } = require("./middleware/auth.js");
dotenv.config()
app.use('/config', express.static('uploads'))



app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors())
app.use(express.json())


app.use(authRouter) 

app.listen(3000, () => {
    console.log('Server is running')
})