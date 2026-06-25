const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();  //LOading eNvironment variables

connectDB(); //MongoDB Connection

const app = express(); 

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

app.use(express.json());  //parses JSON request body as req.body

app.use(express.urlencoded(false));

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev')); //USed for loggig, morgan logger
};

//DEfined rOutes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

console.log("Auth routes mounted");

//HEalth cHeck ROute
app.get('/api/health',(req,res) => {
    res.json({status:"OK", message:"TaskApp is Running..."});
});

//seperate 404 handler for UNmatched ROutes
app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`
  });
});

//GLOBAL Error HAndler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

//Port Listening 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});