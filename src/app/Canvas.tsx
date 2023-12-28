import React, { useRef, useEffect } from 'react';

const CanvasComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (context) {
                // Drawing code here
                context.fillStyle = 'white';
                context.fillRect(0, 0, 800, 600);
            }
        }
    }, []);

    const canvasStyle = {
        border: '3px solid red'  // Adjust border size and style as needed
    };

    return <canvas ref={canvasRef} width={800} height={600} className="border-2 border-red-500" />;

};

export default CanvasComponent;
