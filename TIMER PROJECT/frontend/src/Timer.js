import React, { useState, useEffect } from 'react';

const tickSound = new Audio('/sounds/tick.mp3');
const timeUpSound = new Audio('/sounds/timesup.mp3');
const durations = [5, 10, 15, 20, 60];

function Timer() {
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  // useEffect(() => {
  //   let timer;
  //   if (isRunning && timeLeft > 0) {
  //     tickSound.play();
  //     timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  //   } else if (timeLeft === 0) {
  //     setIsRunning(false);
  //   }
  //   return () => clearTimeout(timer);
  // }, [isRunning, timeLeft]);

  useEffect(() => {
  let timer;
  if (isRunning && timeLeft > 0) {
    tickSound.play();
    timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  } else if (isRunning && timeLeft === 0) {
    timeUpSound.play();
    setIsRunning(false);
  }
  return () => clearTimeout(timer);
}, [isRunning, timeLeft]);

  const handlePlay = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration);
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
    setTimeLeft(duration);
    setIsRunning(false);
  };

  return (
    <div className="timer-container">
      <div className="duration-buttons">
        {durations.map((duration) => (
          <button
            key={duration}
            onClick={() => handleDurationChange(duration)}
            className={selectedDuration === duration ? 'active' : ''}
          >
            {duration}s
          </button>
        ))}
      </div>

      <div className="timer-display">
        {timeLeft > 0 ? `${timeLeft}s` : "Time's Up!"}
      </div>

      <div className="control-buttons">
        <button onClick={handlePlay}>Play</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;
