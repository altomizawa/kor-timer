import React, { useEffect, useRef } from 'react'

const Countdown = ({setStartTimer, setIsTimerSet}: {setStartTimer: React.Dispatch<React.SetStateAction<boolean>>, setIsTimerSet: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [count, setCount] = React.useState<number>(10);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const play321 = () => {
    audioRef.current = new Audio('/sounds/321-robot.mp3');
    audioRef.current.play().catch(() => {});
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (count === 4) {
        play321();
      }
      if (count === 1) {
        clearInterval(timer);
        setStartTimer(true);  
        setIsTimerSet(false); 
        return;
      }
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [count, setStartTimer, setIsTimerSet]);
  return (
    <div className='fixed top-0 left-0 w-screen h-screen text-[40vw] lg:text-[15rem] font-bold flex items-center justify-center'>
       {count}
    </div>
  )
}

export default Countdown
