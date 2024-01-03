import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TimerComponent from './TimerComponent';

const AnotherPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');

    const currentMouseX = useRef(0);
    const currentMouseY = useRef(0);

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    class GameObject {
        x: number;
        y: number;
        color: string;
        speedx: number;
        speedy: number;

        constructor(x: number, y: number, color: string, speedx: number, speedy: number) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.speedx = speedx;
            this.speedy = speedy;
        }

        updatePosition() {
            if (this.x > 770 || this.x < 30) {
                this.speedx = -this.speedx;
            }
            if (this.y > 570 || this.y < 30) {
                this.speedy = -this.speedy;
            }
            this.x += this.speedx;
            this.y += this.speedy;
        }

        drawObject(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 40, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [circle] = useState(new GameObject(200, 200, "green", 6, 10));
    const [square] = useState(new GameObject(300, 250, "blue", 8, 7));
    const [triangle] = useState(new GameObject(150, 250, "red", 11, 5));


    useEffect(() => {
        if (!canvasRef.current) {
            return; // Exit if canvasRef is not yet initialized
        }

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        const isCursorOnObject = (cursorX: number, cursorY: number, gameObject: GameObject) => {
            const dx = cursorX - gameObject.x;
            const dy = cursorY - gameObject.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            return distance <= 40; // Assuming the object's radius is 40
        };



        const checkCollision = (mouseX: number, mouseY: number) => {
            if (isCursorOnObject(mouseX, mouseY, circle) ||
                isCursorOnObject(mouseX, mouseY, square) ||
                isCursorOnObject(mouseX, mouseY, triangle)) {

                navigate('/leaderboard', { state: { seconds } });
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            currentMouseX.current = event.clientX - rect.left;
            currentMouseY.current = event.clientY - rect.top;

            if (currentMouseX.current > 800) {
                currentMouseX.current = 800;
            }
            if (currentMouseX.current < 0) {
                currentMouseX.current = 0;
            }
            if (currentMouseY.current > 600) {
                currentMouseY.current = 600;
            }
            if (currentMouseY.current < 0) {
                currentMouseY.current = 0;
            }
        
            checkCollision(currentMouseX.current, currentMouseY.current);
        };
        

        canvas.addEventListener('mousemove', handleMouseMove);

        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, 800, 600);

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 800, 600);

            circle.updatePosition();
            circle.drawObject(ctx);
            square.updatePosition();
            square.drawObject(ctx);
            triangle.updatePosition();
            triangle.drawObject(ctx);

            checkCollision(currentMouseX.current, currentMouseY.current);
            // console.log(currentMouseX, currentMouseY);

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [circle, navigate, seconds, square, triangle]);

    return (
        <div className="App flex flex-col justify-center items-center min-h-screen">
            <h1>Username: {username}</h1>
            <TimerComponent seconds={seconds} />
            <canvas ref={canvasRef} width={800} height={600} className="border-4 border-red-500"/>
        </div>
    );
};

export default AnotherPage;
