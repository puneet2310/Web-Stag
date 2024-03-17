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

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

async function hashPass(password) {
    const res = await bcryptjs.hash(password, 10);
    return res;
}

async function compare(userPass, hashPass) {
    const res = await bcryptjs.compare(userPass, hashPass);
    return res;
}

// Middleware to authenticate user
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
        res.render("index_2", { name: verify.name });
    } else {
        res.render("index");
    }
});

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

app.post("/signup", async (req, res) => {
    try {
        const check = await Collection.findOne({ name: req.body.name });

        if (check) {
            res.send("<script>alert('Invalid Credentials'); window.location.href = '/signup';</script>");
        } else {
            const token = jwt.sign({ name: req.body.name }, "jdbfhdsbvbdskjhvdfbvmhdsiuhmdsnvldsjkvdbjvhkdsbvdsnlvihdsvbjkkdbsmvbmdsbkjhdskbvmbdsmbhuhfyvhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhkvjhdskbvmbdsjkvhuidsk");

            res.cookie("jwt", token, {
                maxAge: 600000,
                httpOnly: true
            });

            const data = {
                name: req.body.name,
                password: await hashPass(req.body.password),
                mobile_No: req.body.mobile,
                token: token
            };

            await Collection.insertMany([data]);
            res.render("index_1");

        }
    } catch (error) {
        res.send("WRONG DETAILS");

    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await Collection.findOne({ name: req.body.name });
        const passCheck = await compare(req.body.password, check.password);

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

app.post("/checkout", async (req, res) => {
    try {

        const userData = {
            fullName: req.body.fullName,
            address: req.body.address,
            pincode: req.body.pincode
        };

        //Save user's details to the database (e.g., MongoDB)
        await Collection.insertMany([userData]);
        console.log("MONGO CONNECTED - 2")
        res.send("<script>alert('Order placed successfully!'); window.location.href = '/';</script>");
    }
    catch (error) {
        console.error(error);
        res.send("An error occurred during checkout.");
    }
});


app.listen(port, () => {
    console.log(`Server connected to port https://localhost:${port}`);
});
