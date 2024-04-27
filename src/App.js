import React, { useRef, useState } from 'react';
import './App.css';

const App = () => {
  const [timer , setTimer] = useState(['00', '00', '00']);
  const [timerisRunning, setTimerisRunning] = useState(false);
  const lasttimerRef = useRef(Date.now());
  const animationFrameRef = useRef(0);
  const timerStart = () => {
    setTimerisRunning(true);
    animationFrameRef.current = requestAnimationFrame(timerfn);
  }

  const timerStop = () => {
    setTimerisRunning(false);
    cancelAnimationFrame(animationFrameRef.current);
  }

  const timerReset = () => {
    setTimerisRunning(false);
    setTimer(['00', '00', '00']);
    cancelAnimationFrame(animationFrameRef.current);
    lasttimerRef.current = Date.now();
  }

  const timerfn = () => {
    const milliSecondsEllapsed = Date.now() - lasttimerRef.current;
    const secondsEllapsed = Math.floor(milliSecondsEllapsed / 1000);
    const minutesEllapsed = Math.floor(secondsEllapsed/60);

    const milliseconds = (milliSecondsEllapsed % 1000).toString().padStart(3, '0');
    const seconds = (secondsEllapsed % 60).toString().padStart(2, '0');
    const minutes = (minutesEllapsed).toString().padStart(2, '0');

    setTimer([minutes, seconds, milliseconds]);
    animationFrameRef.current = requestAnimationFrame(timerfn);
  }
  return (
    <div className='App'>
      <h1>Stop watch</h1>
      <div>
        <p>
          {
            `${timer[0]}:${timer[1]}:${timer[2]}`
          }
        </p>
      </div>
      <button onClick={timerStart}>Start</button>
      <button onClick={timerStop} >Stop</button>
      <button onClick={timerReset}>Reset</button>
    </div>
  )
}

export default App