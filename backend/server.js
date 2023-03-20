// imports
const express = require("express");
//to help print different colors in the console
const colors = require("colors");
//allows us to have a dotenv file with our config in it
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

//Middleware section
app.use(express.json()); //sets eveything to JSON
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes")); //sets a baseUrl for routes of goals
app.use("/api/users", require("./routes/userRoutes")); //sets a baseUrl for routes of users

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
