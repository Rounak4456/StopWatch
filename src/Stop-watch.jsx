import { useState, useEffect, useRef } from "react";

function Stopwatch() {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const startTime = useRef(0);

    function start() {
        setIsRunning(true);
        startTime.current = Date.now() - time;
    }
    function stop() {
        setIsRunning(false);
    }
    function reset() {
        setIsRunning(false);
        setTime(0);
    }

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTime.current)
            }, 10);
        }
        return () => {
            clearInterval(intervalRef.current);
        }
    }, [isRunning]);
    function formatTime() {
        let hours = Math.floor(time / (1000 * 60 * 60));
        let minutes = Math.floor(time / (1000 * 60) % 60);
        let seconds = Math.floor(time / 1000 % 60);
        let milliseconds = Math.floor((time % 1000) / 10);

        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(2, '0');


        return `${minutes}:${seconds}:${milliseconds}`;
    }



    return (
        <div className="stopwatch">
            <div className="display">
                {formatTime()}
            </div>
            <div className="buttons">
                <button onClick={start} className="start-button">Start</button>
                <button onClick={stop} className="stop-button">Stop</button>
                <button onClick={reset} className="reset-button">Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch