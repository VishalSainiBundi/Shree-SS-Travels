const express= require('express')
const connectDB = require('./connectDB')
const dotenv =require('dotenv')
const userRoute = require('./Routes/userRoute')
const cors= require('cors')

dotenv.config()
const app= express()
app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173"
}))

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