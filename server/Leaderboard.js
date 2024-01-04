const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    seconds: {
        type: Number,
        required: true,
    },
    // Add more fields here if needed
}, {
    timestamps: true // Optional: Mongoose will add createdAt and updatedAt timestamps
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;
