import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// Define the interface for score objects
interface Score {
    username: string;
    seconds: number;
}

const Leaderboard: React.FC = () => {
    const location = useLocation();
    const { seconds } = location.state || {};

    // Use the Score interface for the state
    const [scores, setScores] = useState<Score[]>([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get('http://localhost:5000/leaderboard');
                setScores(response.data);
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchScores();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1>Leaderboard</h1>
            <ul>
                {scores.map((score, index) => (
                    <li key={index}>{score.username}: {score.seconds}</li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
