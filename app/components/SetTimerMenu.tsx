import React from 'react'
import Button from './Button';
import TimerInput from './TimerInput';
import Typo from './Typo';

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
    <div className='w-full space-y-4 flex flex-col items-center'>
      {currentMode === 'TABATA' && <>
        <div className='grid grid-cols-3 gap-4 justify-items-center items-center w-full'>
          <Typo variant="subtitle">ROUNDS:</Typo>
          <TimerInput value={rounds} onChange={setRounds} />
        </div>
        <div className='grid grid-cols-3 gap-4 justify-items-center items-center w-full'>
          <Typo variant="subtitle">WORK:</Typo>
          <TimerInput value={workTime} onChange={setWorkTime} />
          <Typo variant="subtitle">seconds</Typo>
        </div>
        <div className='grid grid-cols-3 gap-4 justify-items-center items-center w-full'>
          <Typo variant="subtitle">REST:</Typo>
          <TimerInput value={restTime} onChange={setRestTime} />
          <Typo variant="subtitle">seconds</Typo>
        </div>
      </>}

      {currentMode === 'AMRAP' && <>
        <div className='flex flex-col lg:flex-row justify-center items-center w-full'>
          <Typo variant="subtitle">AMRAP (minutes):</Typo>
          <TimerInput value={amrapMinutes} onChange={setAmrapMinutes} />
        </div>
      </>}

      {currentMode === 'EMOM' && <>
        <div className='grid grid-cols-3 gap-4 justify-items-center items-center w-full'>
          <Typo variant="subtitle">FOR</Typo>
          <TimerInput value={emomRounds} onChange={setEmomRounds} />
          <Typo variant="subtitle">ROUNDS</Typo>
        </div>
        <div className='grid grid-cols-3 gap-4 justify-items-center items-center w-full'>
          <Typo variant="subtitle">EVERY</Typo>
          <TimerInput value={emomIntervalMinutes} onChange={setEmomIntervalMinutes} />
          <Typo variant="subtitle">MIN</Typo>
        </div>
        <div className='grid grid-cols-3 gap-4 justify-items-center items-center w-full'>
          <Typo variant="subtitle">AND</Typo>
          <TimerInput value={emomIntervalSeconds} onChange={setEmomIntervalSeconds} />
          <Typo variant="subtitle">SEC</Typo>
        </div>
      </>}

      {currentMode === 'FOR TIME' && <>
        <div className='grid grid-cols-3 gap-4 justify-items-center items-center w-full'>
          <Typo variant="subtitle">CAP:</Typo>
          <TimerInput value={forTimeCapMinutes} onChange={setForTimeCapMinutes} />
          <Typo variant="subtitle">MINUTES</Typo>
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
