const express = require('express');
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const PORT = process.env.PORT || 8080;
//http://localhost:8080/
app.listen(PORT, (err) => {
    if (err) {
        console.log('Something went wrong', err);
    } else {
        console.log('Listening on port 8080');
    }
})


//Connect to MongoDB
const URL = "mongodb+srv://jasonmortadev:mXq4LicOoQh4N8tu@cluster0.ddtph59.mongodb.net/mernusers?retryWrites=true&w=majority"
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(URL);
}

//Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    todo: Array
});

const userModel = mongoose.model('users', userSchema);


//API endpoint
//http://localhost:8080/
app.get("/", (req, res) => {
    res.send('<h1>Hello</h1>');
})

//http://localhost:8080/register
app.post("/register", inappropriate ,  async (req, res) => {
    // req.query.name
    // req.query.password
    // req.query.email

    const newUser = new userModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    await newUser.save();
    res.send(newUser)
    console.log("user added")


})


//http://localhost:8080/login
    app.post("/login", async (req, res) => {
        console.log('req', req.body)

        //Create the JWT token
        payload = {
            'email': req.body.email
        }
        let token = jwt.sign(JSON.stringify(payload), "mernapp", {
            algorithm: 'HS256'
        })

        // req.query.email
        const foundUser = await userModel.findOne({ email: req.body.email });

        if (foundUser === null) {
              res.send(`${req.body.email} not found`)
              console.log("user not found")
              
        } else {
              res.send([token, foundUser])
              console.log("user logged in")
        }
    })


//Middleware
function inappropriate(req, res, next) {
 
    //10 inappropriate words
    const words = ["Cow", "Damn", "Crap", "Bloody", "Bullshit", "Bugger", "Balls", "Asshole", "Shit", "Bitch"];
 
    function check(word) {
        return word === req.body.username
    }
    console.log('words.some(check)', words.some(check))

    if (words.some(check)) {
        res.send(" Please choose a different username")
    } else {
        next()
    }
}
