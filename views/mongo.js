const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/per")
.then(() => {
    console.log("MONGO CONNECTED")
})
.catch(() => {
    console.log("ERROR")
})

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        //required:true
    },
    email:{
        type:String,
        //required:true
    },
    password:{
        type: String,
        //required:true
    },
    mobile:{
        type:String,
        enum:[0-9]
    },
    address:{
        type: String,
        //required: true
    },
    token:{
        type: String,
       
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // }
},{timestamps: true})

userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const User = new mongoose.model("User",userSchema)
module.exports = User