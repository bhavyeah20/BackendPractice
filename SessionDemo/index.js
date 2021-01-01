const express = require('express');
const app = express();
const session = require('express-session');

//express session is gonna sign the cookie it sends back
const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false };

app.use(session(sessionOptions)); //this will be an actual secret in production

app.get('/viewcount', (req, res) => {
    console.log(req.session);
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    console.log(req.session);
    res.send(`You have visited this page ${req.session.count} times`);
})

app.get('/register', (req, res) => {
    const { username = 'Anonymous' } = req.query;
    req.session.username = username;
    res.redirect('/greet');
})

app.get('/greet', (req, res) => {
    const { username } = req.session;
    res.send(`Welcome back ${username}`);
})

app.listen(3000, () => {
    console.log('Serving!')
})

//connect.sessionID 

//memorystore