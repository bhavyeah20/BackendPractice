// One to Bajillions

const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("we're in")
    })
    .catch(err => {
        console.log(err)
    })

//parent
const userSchema = Schema({
    username: String,
    age: Number
});

//child
const tweetSchema = Schema({
    tweet: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async () => {
    const user = await User.findOne({ username: 'Chickenlover' });
    const tweet2 = new Tweet({ tweet: 'Bock bock bock', likes: 12313 });
    tweet2.user = user;
    tweet2.save();
}

const findTweet = async () => {
    // const t = await Tweet.findOne({}).populate('user', 'username');
    const t = await Tweet.find({}).populate('user');
    console.log(t);
}

findTweet();