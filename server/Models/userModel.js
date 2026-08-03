const mongoose= require('mongoose')

const UserShema= mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phone:{
            type:String,
            required:true
        },
        is_verify:{
            type:Boolean,
            default :false
        },
        verifycode:{
            type:String
        },
        password:{
            type:String,
            required:true
        }
    },{
        timestramp:true
    }
)

const userModel= mongoose.model("user", UserShema)
module.exports = userModel