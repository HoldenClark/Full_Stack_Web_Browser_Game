// Leaderboard.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const Leaderboard: React.FC = () => {
    const location = useLocation();
    const { seconds } = location.state || {};

    return (
        <div className="App flex flex-col justify-center items-center min-h-screen">
            <h1>Leaderboard</h1>
            <p>Time: {seconds} seconds</p>
        </div>
    );
};

export default Leaderboard;
