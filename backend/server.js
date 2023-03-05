// imports
const express = require("express");
//allows us to have a dotenv file with our config in it
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

//sets a baseUrl for routes of goals
app.use("/api/goals", require("./routes/goalRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
