const express = require('express')
const indexRoute = require('./routes/index')
const path = require("path");

const app = express();
const port = 5000;


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(indexRoute);


app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
});

