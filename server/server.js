const express       = require("express");
const app           = express();
const userRouter    = require('./router/userRoutes');   
const dbConnection  = require('./conn'); 
const cors          = require('cors');
const dotenv        = require('dotenv');
const cookieParser  = require('cookie-parser');

dotenv.config({ path: './config.env' });

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Mongoose Connection
dbConnection.init();

// API Routes
app.use('/api/user', userRouter);


app.listen(process.env.PORT, () => {
    console.log("Server Started");
})