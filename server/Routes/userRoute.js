const express= require('express')
const { create, login, verify } = require('../Controllers/userController')

const userRoute= express.Router() 

userRoute.post('/create', create)
userRoute.post('/login', login)
userRoute.post('/verify/:email', verify)

module.exports=  userRoute