const mongoose = require('mongoose');
const Product = require('./product');
const { Schema } = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name!']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required!']
    },
    products: [
        {
            type: Schema.Types.ObjectId, ref: 'Product'
        }
    ]
})

// farmSchema.pre('findOneAndDelete', async function (data) {
//     console.log('Preee');
//     console.log(data);
// })

// farmSchema.post('findOneAndDelete', async function (data) {
//     console.log('Post');
//     console.log(data);
// })

farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
        for (let product of farm.products) {
            const res = await Product.findByIdAndDelete(product);
            res.save();
        }
    }
})


const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;