const express = require('express')
const app = express()
import dotenv from "dotenv";

const port = 5000;
dotenv.config();

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`App started on port ${port}`)
})
