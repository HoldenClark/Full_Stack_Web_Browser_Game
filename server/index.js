const Leaderboard = require('./Leaderboard'); // Adjust the path as necessary


const express = require('express')
const app = express()
const dotenv = require('dotenv');
app.use(express.json());
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the URL of your frontend
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


const port = 5000;
dotenv.config();

mongoose.connect('mongodb+srv://holdenjclark:m9ICCsweaJasGzpV@clusterprotoss.ddygkhu.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`App started on port ${port}`)
})

app.post('/leaderboard', async (req, res) => {
    try {
        const { username, seconds } = req.body;

        // Create a new leaderboard entry
        const leaderboardEntry = new Leaderboard({ username, seconds });
        await leaderboardEntry.save();

        res.status(201).send('Leaderboard data saved');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});