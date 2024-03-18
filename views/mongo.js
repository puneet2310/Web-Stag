//this file just establishes connection with the mongodb database and gives responses as needed
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/per")    //connectio string to the database called per
.then(() => {
    console.log("MONGO CONNECTED")
})
.catch(() => {
    console.log("ERROR")
})

//defining the schema for all inputs
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

//making a collection called user but mongodb changes it to users 
const User = new mongoose.model("User",userSchema)
module.exports = User    //export the model to use in other parts of the pages
