const express = require('express');
const app = express();
const morgan = require('morgan');

// app.use(morgan('tiny'))

// app.use((req, res, next) => {
//     console.log('first middleware');
//     return next();
// })

// app.use((req, res, next) => {
//     console.log('second middleware');
//     return next();
// })

// app.use((req, res, next) => {
//     req.reqeustedTime = Date.now();
//     console.log(req.method, req.path);
//     next();
// })

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    res.send('Incorrect Password!');
}

// app.use((req, res, next) => {
//     const { password } = req.query;
//     if (password === 'chickennugget') {
//         next();
//     }
//     res.send('Incorrect Password!');
// })

app.get('/', (req, res) => {
    res.send('HOME PAGE!');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('I love C++ !!!')
    console.log(req.reqeustedTime)
})

app.use((req, res) => {
    res.status(404).send('Not found!')
})
app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})