'use client'


// ControlledInput.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ControlledInput: React.FC = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/another-page?username=${encodeURIComponent(text)}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <h1>Enter Username: </h1>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Type your username"
          style={{ color: 'black' }}
        />
        <button type="submit" className="mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ControlledInput;

