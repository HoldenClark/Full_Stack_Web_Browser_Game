'use client'

// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ControlledInput from './username';
import AnotherPage from './AnotherPage';
import Leaderboard from './Leaderboard'; // Import the Leaderboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ControlledInput />} />
        <Route path="/another-page" element={<AnotherPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
