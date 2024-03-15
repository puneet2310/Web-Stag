// const express = require('express')
// const Collection = require('./views/mongo')


// const app = express()

// const path = require('path')
// const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')
// const bcryptjs = require('bcryptjs')
// const port = 5000;

// app.use(express.json())
// app.use(cookieParser())
// // app.use(bcryptjs)
// app.use(express.urlencoded({extended : false}))

// // const templatePath =  path.join(__dirname,"./views")
// // const publicPath = path.join(__dirname,"./public")


// // app.set("view engine","hbs")
// app.set("view engine","ejs")
// // app.set("views",templatePath)
// // app.use(express.static(publicPath))
// app.use(express.static(path.join(__dirname,'public')))
// app.use(express.static(path.join(__dirname,'views')))

// async function hashPass(password){
//     const res = await bcryptjs.hash(password,10)
//     return res
// }

// async function compare(userPass , hashPass){
//     const res = await bcryptjs.compare(userPass,hashPass)
//     return res
// }


// app.get("/",(req,res) => {

//     if(req.cookies.jwt){
//         const verify = jwt.verify(req.cookies.jwt,"jdbfhdsbvbdskjhvdfbvmhdsiuhmdsnvldsjkvdbjvhkdsbvdsnlvihdsvbjkkdbsmvbmdsbkjhdskbvmbdsmbhuhfyvhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhkvjhdskbvmbdsjkvhuidsk")
//         res.render("home",{name:verify.name})
//     }
//     else{
//         res.render("index")
//     }
// })

// app.get("/signup",(req,res) => {
//     res.render("signup")
// })

// app.get("/login", (req, res) => {
//     res.render("login");
// });

// app.get("/products",(req,res) => {
//     res.render("products")
// })

// app.get("/cart", (req, res) => {
//     res.render("cart");
// });

// app.get("/contact", (req, res) => {
//     res.render("contact");
// });

// app.get("/new_index", (req, res) => {
//     res.render("new_index");
// });

// app.get("/about", (req, res) => {
//     res.render("about");
// });
// app.get("/checkout", (req, res) => {
//     res.render("checkout");
// });

// app.post("/signup",async (req,res) => {
//     try {

//         if (!req.body.name) {
//             return res.send("<script>alert('UserName is required'); window.location.href = '/signup';</script>");
//         }
//         if (!req.body.email) {
//             return res.send("<script>alert('Email is required'); window.location.href = '/signup';</script>");
//         }
//         if (!req.body.password) {
//             return res.send("<script>alert('Password is required'); window.location.href = '/signup';</script>");
//         }

//         const check = await Collection.findOne({name:req.body.name})
        
//         if(check){
//             res.send("USER ALREADY EXISTS")
//         }
//         else{
//             const token = jwt.sign({name:req.body.name},"jdbfhdsbvbdskjhvdfbvmhdsiuhmdsnvldsjkvdbjvhkdsbvdsnlvihdsvbjkkdbsmvbmdsbkjhdskbvmbdsmbhuhfyvhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhkvjhdskbvmbdsjkvhuidsk")
            
//             // res.cookie("jwt",token,{
//             //     maxAge:600000,
//             //     httpOnly:true
//             // })

//             const data = {
//                 name: req.body.name,
//                 password: await hashPass(req.body.password),
//                 token: token,
//             }

//             await Collection.insertMany([data])
//             res.render("index")

            
//         }
//     } catch (error) {
//         res.send("WRONG DEATILS")
        
//     }
// })

// app.post("/login",async (req,res) => {
//     try {
//         const check = await Collection.findOne({name:req.body.name})
//         const passCheck = await compare(req.body.password , check.password)
//         console.log(check)

//         if(check && passCheck){

//             // res.cookie("jwt",check.token,{
//             //     maxAge:600000,
//             //     httpOnly:true
//             // })

//             res.render("index.js",{name:req.body.name})
//         }
//         else{
//             res.send("<script>alert('Invalid Credentials 3'); window.location.href = '/login';</script>");
//         }
//     }
//     catch{
//         // res.send("wrong")
//         res.send("<script>alert('Invalid Credentials'); window.location.href = '/login';</script>");
//     }
// })

// app.listen(port, () => {
//     console.log(`Server connected to port https://localhost:${port}`)
// })


const express = require('express')
const Collection = require('./views/mongo')


const app = express()

const path = require('path')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bcryptjs = require('bcryptjs')
const port = 3000;

app.use(express.json())
app.use(cookieParser())
// app.use(bcryptjs)
app.use(express.urlencoded({extended : false}))

// const templatePath =  path.join(__dirname,"./views")
// const publicPath = path.join(__dirname,"./public")


// app.set("view engine","hbs")
app.set("view engine","ejs")
// app.set("views",templatePath)
// app.use(express.static(publicPath))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'views')))

async function hashPass(password){
    const res = await bcryptjs.hash(password,10)
    return res
}

async function compare(userPass , hashPass){
    const res = await bcryptjs.compare(userPass,hashPass)
    return res
}


app.get("/",(req,res) => {

    if(req.cookies.jwt){
        const verify = jwt.verify(req.cookies.jwt,"jdbfhdsbvbdskjhvdfbvmhdsiuhmdsnvldsjkvdbjvhkdsbvdsnlvihdsvbjkkdbsmvbmdsbkjhdskbvmbdsmbhuhfyvhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhkvjhdskbvmbdsjkvhuidsk")
        res.render("home",{name:verify.name})
    }
    else{
        res.render("index")
    }
})

app.get("/signup",(req,res) => {
    res.render("signup")
})

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/products",(req,res) => {
    res.render("products")
})

app.get("/cart", (req, res) => {
    res.render("cart");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/checkout", (req, res) => {
    res.render("checkout");
});

app.post("/signup",async (req,res) => {
    try {

        if (!req.body.name) {
            return res.send("<script>alert('UserName is required'); window.location.href = '/signup';</script>");
        }
        if (!req.body.email) {
            return res.send("<script>alert('Email is required'); window.location.href = '/signup';</script>");
        }
        if (!req.body.password) {
            return res.send("<script>alert('Password is required'); window.location.href = '/signup';</script>");
        }

        const check = await Collection.findOne({name:req.body.name})
        
        if(check){
            res.send("USER ALREADY EXISTS")
        }
        else{
            const token = jwt.sign({name:req.body.name},"jdbfhdsbvbdskjhvdfbvmhdsiuhmdsnvldsjkvdbjvhkdsbvdsnlvihdsvbjkkdbsmvbmdsbkjhdskbvmbdsmbhuhfyvhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhkvjhdskbvmbdsjkvhuidsk")
            
            // res.cookie("jwt",token,{
            //     maxAge:600000,
            //     httpOnly:true
            // })

            const data = {
                name: req.body.name,
                password: await hashPass(req.body.password),
                token: token,
            }

            await Collection.insertMany([data])
            res.render("index_1")

            
        }
    } catch (error) {
        res.send("WRONG DEATILS")
        
    }
})

app.post("/login",async (req,res) => {
    try {
        const check = await Collection.findOne({name:req.body.name})
        const passCheck = await compare(req.body.password , check.password)
        console.log(check)

        if(check && passCheck){

            // res.cookie("jwt",check.token,{
            //     maxAge:600000,
            //     httpOnly:true
            // })

            res.render("new_index",{name:req.body.name})
        }
        else{
            res.send("<script>alert('Invalid Credentials'); window.location.href = '/login';</script>");
        }
    }
    catch{
        // res.send("wrong")
        res.send("<script>alert('Invalid Credentials'); window.location.href = '/login';</script>");
    }
})

app.listen(port, () => {
    console.log(`Server connected to port https://localhost:${port}`)
})