const mongoose = require('mongoose')
const dotenv = require('dotenv')

const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.Mongo_Url,{
            dbName: process.env.db_Name
        }

        )

console.log("DB connected")

    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB