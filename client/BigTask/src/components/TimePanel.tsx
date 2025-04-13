import { useState, useEffect, useRef } from "react";

const TimePanel = ({ initialSeconds = 60 }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<any>(null);

    useEffect(() => {
        if (isRunning && seconds > 0) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const start = () => {
        if (seconds > 0) setIsRunning(true);
    };

    const pause = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    };


    const formatTime = (totalSeconds: number) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-row p-5 gap-5">
            <div className="text-4xl font-bold ">{formatTime(seconds)}</div>
            <div>
                    <button onClick={isRunning ? pause : start} style={{backgroundColor: '#FFD700'}} className="p-2">
                        {isRunning ? 'Pause' : 'Start'}
                    </button>
            </div>
        </div>
    );
};

export default TimePanel;
