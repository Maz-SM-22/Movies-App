const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 
const router = express.Router();

dotenv.config({path: './config/config.env'});
const PORT = process.env.PORT; 

const routeUsers = require('./routes/users'); 
const routeMovies = require('./routes/movies'); 

app.listen(PORT, ()=> {
    console.log(`Server active at http://localhost:${PORT}`); 
})