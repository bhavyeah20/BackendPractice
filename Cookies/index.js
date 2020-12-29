const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
    const { name = 'No cookie' } = req.cookies;
    res.send(`Hi there ${name}! `);
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'stevie G');
    res.cookie('animal', 'lion');
    res.send('Sending a cookie');
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true });
    res.send('Signing');
})

app.get('/verifyfruit', (req, res) => {
    res.send(req.signedCookies);
})

app.listen(3000, () => {
    console.log('SERVING')
})