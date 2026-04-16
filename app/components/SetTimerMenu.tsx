import React from 'react'
import Button from './Button';
import TimerInput from './TimerInput';

type TimerMode = "TABATA" | "AMRAP" | "EMOM" | "FOR TIME";

interface SetTimerMenuProps {
  currentMode: TimerMode;
  rounds: number;
  setRounds: React.Dispatch<React.SetStateAction<number>>;
  workTime: number;
  setWorkTime: React.Dispatch<React.SetStateAction<number>>;
  restTime: number;
  setRestTime: React.Dispatch<React.SetStateAction<number>>;
  amrapMinutes: number;
  setAmrapMinutes: React.Dispatch<React.SetStateAction<number>>;
  emomRounds: number;
  setEmomRounds: React.Dispatch<React.SetStateAction<number>>;
  emomIntervalMinutes: number;
  setEmomIntervalMinutes: React.Dispatch<React.SetStateAction<number>>;
  forTimeCapMinutes: number;
  emomIntervalSeconds: number;
  setEmomIntervalSeconds: React.Dispatch<React.SetStateAction<number>>;
  setForTimeCapMinutes: React.Dispatch<React.SetStateAction<number>>;
  setIsTimerSet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetTimerMenu = ({ currentMode, rounds, setRounds, workTime, setWorkTime, restTime, setRestTime, amrapMinutes, setAmrapMinutes, emomRounds, setEmomRounds, emomIntervalMinutes, setEmomIntervalMinutes, emomIntervalSeconds, setEmomIntervalSeconds, forTimeCapMinutes, setForTimeCapMinutes, setIsTimerSet }: SetTimerMenuProps) => {
  return (
    <div className='w-[40vw] space-y-4 flex flex-col items-center'>
      {currentMode === 'TABATA' && <>
        <div className='flex flex-col lg:flex-row justify-center items-center w-full '>
          <h2 className='subtitle text-center lg:text-right'>ROUNDS:</h2>
          <TimerInput value={rounds} onChange={setRounds} />
        </div>
        <div className='flex flex-col lg:flex-row justify-center items-center w-full '>
          <h2 className='subtitle text-center lg:text-right'>WORK:</h2>
          <TimerInput value={workTime} onChange={setWorkTime} />
          <h2 className='subtitle text-center lg:text-right'>seconds</h2>
        </div>
        <div className='flex flex-col lg:flex-row justify-center items-center w-full '>
          <h2 className='subtitle text-center lg:text-right'>REST:</h2>
          <TimerInput value={restTime} onChange={setRestTime} />
          <h2 className='subtitle text-center lg:text-right'>seconds</h2>
        </div>
      </>}

      {currentMode === 'AMRAP' && <>
        <div className='flex flex-col lg:flex-row justify-center items-center w-full'>
          <h2 className='subtitle text-center lg:text-right'>AMRAP (minutes):</h2>
          <TimerInput value={amrapMinutes} onChange={setAmrapMinutes} />
        </div>
      </>}

      {currentMode === 'EMOM' && <>
        <div className='flex flex-col lg:flex-row justify-center items-center w-full '>
          <h2 className='subtitle text-right col-span-2'>FOR:</h2>
          <TimerInput value={emomRounds} onChange={setEmomRounds} />
          <h2 className='subtitle text-left col-span-2'>ROUNDS</h2>
        </div>
        <div className='flex flex-col lg:flex-row justify-center items-center w-full '>
          <h2 className='subtitle text-right col-span-2'>EVERY:</h2>
          <TimerInput value={emomIntervalMinutes} onChange={setEmomIntervalMinutes} />
          <h2 className='subtitle text-left col-span-2'>MIN</h2>
        </div>
        <div className='flex flex-col lg:flex-row justify-center items-center w-full '>
          <h2 className='subtitle text-right col-span-2'></h2>
          <TimerInput value={emomIntervalSeconds} onChange={setEmomIntervalSeconds} />
          <h2 className='subtitle text-left col-span-2'>SEC</h2>
        </div>
      </>}

      {currentMode === 'FOR TIME' && <>
        <div className='flex flex-col lg:flex-row justify-center items-center w-full '>
          <h2 className='subtitle text-right col-span-2'>CAP:</h2>
          <TimerInput value={forTimeCapMinutes} onChange={setForTimeCapMinutes} />
          <h2 className='subtitle text-left col-span-2'>MINUTES</h2>
        </div>
      </>}

        <Button onClick={() => {
          setIsTimerSet(true);
        }}>
          START
        </Button>
      
    </div>
  )
}

export default SetTimerMenu
