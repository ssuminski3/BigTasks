import { useState, useEffect, useRef } from "react";

type TimePanelProps = {
    initialSeconds?: number;
    onEnd?: () => void;
};

const TimePanel = ({ initialSeconds = 60, onEnd }: TimePanelProps) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        // Reset timer if initialSeconds changes
        setSeconds(initialSeconds);
        setIsRunning(false);
        clearInterval(intervalRef.current as number);
        return () => clearInterval(intervalRef.current as number);
    }, [initialSeconds]);

    useEffect(() => {
        if (isRunning && seconds > 0) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current as number);
                        if (onEnd) onEnd();  // Call the callback on end
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000); // Faster updates (was 1000ms) for more responsive feel
        }
        return () => clearInterval(intervalRef.current as number);
    }, [isRunning, seconds, onEnd]);

    const start = () => {
        if (seconds > 0) setIsRunning(true);
    };

    const pause = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current as number);
    };

    const formatTime = (totalSeconds: number) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-row p-5 gap-5">
            <div className="text-4xl font-bold">{formatTime(seconds)}</div>
            <div>
                <button
                    onClick={isRunning ? pause : start}
                    style={{ backgroundColor: '#FFD700' }}
                    className="p-2"
                >
                    {isRunning ? 'Pause' : 'Start'}
                </button>
            </div>
        </div>
    );
};

export default TimePanel;
