// TimerComponent.tsx
import React from 'react';

type TimerComponentProps = {
    seconds: number;
};

const TimerComponent: React.FC<TimerComponentProps> = ({ seconds }) => {
    return <p>Time elapsed: {seconds} seconds</p>;
};

export default TimerComponent;
