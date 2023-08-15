const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const taskRouter = require('./routes/taskRoutes')

const app = express();
dotenv.config();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));

// Enable CORS for all routes
app.use(cors());

// Route Setup
app.use('/api', taskRouter);

// PORT Config
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Connected to PORT=> ${port}`);
});
