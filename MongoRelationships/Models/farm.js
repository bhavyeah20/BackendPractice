// One to Many

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("we're in")
    })
    .catch(err => {
        console.log(err)
    })

//child
const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Summer', 'Spring', 'Fall', 'Winter']
    }
});

//parent
const farmSchema = mongoose.Schema({
    name: String,
    city: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Godess Melon', price: 3.99, season: 'Summer' },
//     { name: 'Sugar Baby Watermelon', price: 3.99, season: 'Summer' },
//     { name: 'Asparagus', price: 3.99, season: 'Spring' }
// ])

// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda,CA' });
//     const melon = await Product.findOne({ name: 'Godess Melon' });
//     farm.products.push(melon);
//     await farm.save();
//     console.log(farm)
// }

// makeFarm();

// const addProduct = async () => {
//     const farm = await Farm.findOne({ name: 'Full Belly Farms' });
//     const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon' });
//     farm.products.push(watermelon);
//     await farm.save();
//     console.log(farm);
// }

// addProduct();

Farm.findOne({ name: 'Full Belly Farms' })
    .populate('products')
    .then(farm => console.log(farm))