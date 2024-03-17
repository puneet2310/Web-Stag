//importing the necessary packages
const express = require('express');
const Collection = require('./views/mongo');
const app = express();

const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcryptjs = require('bcryptjs');
const port = 2000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//setting the view engine to ejs type
app.set("view engine", "ejs");

//connecting the files that have the source images and ejs files containing the codes to different pages
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

//function to encrypt the password entered by the user
async function hashPass(password) {
    const res = await bcryptjs.hash(password, 10);
    return res;
}

//compare() function to check if the enterd password and the encrypted one match hence giving the boolean value in return 
async function compare(userPass, hashPass) {
    const res = await bcryptjs.compare(userPass, hashPass);
    return res;
}

//checks the authenticity of the user by first checking if there is a token of the name that user entered and the one in db match
const authenticateUser = (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const verify = jwt.verify(req.cookies.jwt, "jdbfhdsbvbdskjhvdfbvmhdsiuhmdsnvldsjkvdbjvhkdsbvdsnlvihdsvbjkkdbsmvbmdsbkjhdskbvmbdsmbhuhfyvhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhkvjhdskbvmbdsjkvhuidsk");
            req.user = verify;
            next();
        } catch (err) {
            res.clearCookie("jwt");
            res.redirect("/login"); // Redirect to login page if JWT verification fails
        }
    } else {
        res.redirect("/login"); // Redirect to login page if JWT cookie is not present
    }
};

app.get("/", (req, res) => {
    if (req.cookies.jwt) {
        const verify = jwt.verify(req.cookies.jwt, "jdbfhdsbvbdskjhvdfbvmhdsiuhmdsnvldsjkvdbjvhkdsbvdsnlvihdsvbjkkdbsmvbmdsbkjhdskbvmbdsmbhuhfyvhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhkvjhdskbvmbdsjkvhuidsk");
        res.render("index", { name: verify.name });
    } else {
        res.render("index");
    }
});

// rendering different pages depending on the requests of those pages 
app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/products", (req, res) => {
    res.render("products");
});

// Authentication added for the cart route
app.get("/cart", authenticateUser, (req, res) => {
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

app.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.render("index");
});


//these lines are for when the user has logged into the website

app.get("/new_index", (req, res) => {
    res.render("new_index");
});

app.get("/products_new",(req,res) => {
    res.render("products_new")
})

app.get("/cart_new", (req, res) => {
    res.render("cart_new");
});

app.get("/contact_new", (req, res) => {
    res.render("contact_new");
});

app.get("/about_new", (req, res) => {
    res.render("about_new");
});

app.get("/checkout_new", (req, res) => {
    res.render("checkout_new");
});


//This is code for signup form and its working
app.post("/signup", async (req, res) => {
    try {
        const check = await Collection.findOne({ name: req.body.name });

        if (check) {
            res.send("<script>alert('Invalid Credentials'); window.location.href = '/signup';</script>");
        } else {
            const token = jwt.sign({ name: req.body.name }, "jdbfhdsbvbdskjhvdfbvmhdsiuhmdsnvldsjkvdbjvhkdsbvdsnlvihdsvbjkkdbsmvbmdsbkjhdskbvmbdsmbhuhfyvhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhkvjhdskbvmbdsjkvhuidsk");

            res.cookie("jwt", token, {
                maxAge: 600000,        //expiration time 10 minutes
                httpOnly: true        
            });

                //inserting the data into the collection
            const data = {
                name: req.body.name,
                password: await hashPass(req.body.password),
                mobile_No: req.body.mobile,
                token: token
            };

            //inserting the user data into the collection
            await Collection.insertMany([data]);
            res.render("new_index");

        }
    } catch (error) {
        res.send("WRONG DETAILS");        //in case any error occured during the trial

    }
});

//now is the code for the login block
app.post("/login", async (req, res) => {
    try {
        const check = await Collection.findOne({ name: req.body.name });                //checking if such a username exists
        const passCheck = await compare(req.body.password, check.password);        //comparing the passwords

        if (check && passCheck) {
            res.cookie("jwt", check.token, {
                maxAge: 600000,
                httpOnly: true
            });

            res.render("new_index", { name: req.body.name });
        } else {
            res.send("<script>alert('Invalid Credentials'); window.location.href = '/login';</script>");
        }
    }
    catch {
        res.send("<script>alert('Invalid Credentials'); window.location.href = '/login';</script>");
    }
});

//now is the snippet for the filling of checkout page data 
app.post("/checkout_new", async (req, res) => {
    try {
        const userData = {
            fullName: req.body.fullName,   
            address: req.body.address,
            pincode: req.body.pincode
        };

        //Save user's details to the database (e.g., MongoDB)
        await Collection.insertMany([userData]);
        console.log("MONGO CONNECTED - 2")
        res.send("<script>alert('Order placed successfully!'); window.location.href = '/new_index';</script>");        //after placing the order we are redirected to index
    }
    catch (error) {
        console.error(error);
        res.send("An error occurred during checkout.");        //in case some error has occured
    }
});

//starting the server on the port
app.listen(port, () => {
    console.log(`Server connected to port https://localhost:${port}`);
});
