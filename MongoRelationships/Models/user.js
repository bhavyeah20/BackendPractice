// One to Few

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("we're in")
    })
    .catch(err => {
        console.log(err)
    })


const userSchema = mongoose.Schema({
    first: String,
    last: String,
    adresses: [
        {
            _id: { id: false },
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]

})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.adresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })

    const res = await u.save();
    console.log(res);
}

const addAddress = async (id) => {
    const u = await User.findById(id);
    u.adresses.push({
        street: '123 Baker St.',
        city: 'Los Santos',
        state: 'LS',
        country: 'USA'
    })

    const res = await u.save();
    console.log(res)
}

addAddress('5fe77e9c0aa083283465dfe9');