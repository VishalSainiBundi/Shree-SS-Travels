const express= require('express')
const connectDB = require('./connectDB')
const dotenv =require('dotenv')
const userRoute = require('./Routes/userRoute')

dotenv.config()
const app= express()
app.use(express.json())

app.use('/user', userRoute)

connectDB()
.then(
    ()=>{
        app.listen(process.env.port, ()=>{
            console.log(`server start on`)
        })
    }
).catch(
    (error)=>{
        console.log(error)
    }
)