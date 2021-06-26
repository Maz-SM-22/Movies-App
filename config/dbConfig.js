const mongoose = require('mongoose'); 
const dotenv = require('dotenv'); 
dotenv.config({path: './config.env'});

const dbConnect = async ()=> {
    try {
        await mongoose.connect(process.env.LOCAL_MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected 👽');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err); 
    }
}

module.exports = dbConnect; 