const express = require('express');
require('dotenv').config()
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const PORT = process.env.PORT || 8080;
// http://localhost:8080/
app.listen(PORT, (err) => {
    if (err) {
        console.log('Something went wrong', err);
    } else {
        console.log('Listening on port 8080');
    }
})



//Connect to MongoDB
const URL = process.env.MONGODB_URL;
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(URL);
}

//Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: { type: String, required: true },
    email: String,
    todo: Array,
    date: { type: Date, default: Date.now }
});

const userModel = mongoose.model('users', userSchema);


//API endpoint
//http://localhost:8080/
// app.get("/", (req, res) => {
//     res.send('<h1>Hello</h1>');
// })

//! http://localhost:8080/register
app.post("/register", inappropriateMiddleware, async (req, res) => {
    // req.body.name
    // req.body.password
    // req.body.email
    //Create the JWT token
    try {
        payload = {
            'email': req.body.email
        }
        let token = jwt.sign(JSON.stringify(payload), process.env.JWT_KEY, {
            algorithm: 'HS256'
        });


        const newUser = new userModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            todo: ["clean", "cook", "eat", "sleep", "code", "repeat"]
        });

        await newUser.save();
        res.send([token, newUser])
        console.log("user added")

    } catch (error) {
        console.log(error)
        res.send(error)
    }


})


//! http://localhost:8080/login
app.post("/login", async (req, res) => {
    console.log('req', req.body)

    //Create the JWT token
    payload = {
        'email': req.body.email
    }
    let token = jwt.sign(JSON.stringify(payload), process.env.JWT_KEY, {
        algorithm: 'HS256'
    });

    // req.body.email
    const foundUser = await userModel.findOne({ email: req.body.email });

    if (foundUser === null) {
        res.json("not found")
        console.log("user not found")

    } else {
        res.send([token, foundUser])
        console.log("user logged in")
    }
})

//! http://localhost:8080/delete
app.delete("/delete", JWTAuth, async (req, res) => {

    const query = { _id: req.body.id };
    const deleted = await userModel.findOneAndUpdate(query, { $pull: { todo: req.body.todo_item } }, { new: true })
    res.send([" ", deleted])
    console.log("to-do deleted")
})


//! Middleware
function inappropriateMiddleware(req, res, next) {

    //10 inappropriate words
    const words = ["Cow", "Damn", "Crap", "Bloody", "Bullshit", "Bugger", "Balls", "Asshole", "Shit", "Bitch"];

    function check(word) {
        return word === req.body.username
    }

    console.log('bad word', words.some(check))

    if (words.some(check)) {
        let errorMsg = "Please choose a different username"
        res.send(["!OK", errorMsg])
    } else {
        next()
    }
}

function JWTAuth(req, res, next) {

    try {
        const token = req.headers.auth;
        const verify = jwt.verify(token, process.env.JWT_KEY);
        
        // Token verification successful, you can proceed with the verified data
        console.log('Token verified:', verify);
        next()
      } catch (error) {
        // Token verification failed, handle the error
        console.error('Token verification error:', error.message);
        // You can also return an appropriate response to the client indicating the error
        res.send(["", error.message]);
    
      }

   
}





