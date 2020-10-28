// create an express server

const express = require("express");

const app = express();

const apiRoute = require("./routes/apiroute.js");

const htmlRoute = require("./routes/htmlroute.js");


const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.use(apiRoute);
app.use(htmlRoute);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  });