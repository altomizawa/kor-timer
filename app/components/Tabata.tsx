import { useState, useEffect } from "react";
import SetTimerMenu from "./SetTimerMenu";
import Countdown from "./Countdown";
import { ArrowLeftCircle } from "lucide-react";
import Timer from "./Timer";

type TimerMode = "TABATA" | "AMRAP" | "EMOM" | "FOR TIME";

const Tabata = ({ currentMode, setCurrentMode }: { currentMode: TimerMode; setCurrentMode: React.Dispatch<React.SetStateAction<TimerMode | null>> }) => {
  const [rounds, setRounds] = useState<number>(8);
  const [workTime, setWorkTime] = useState<number>(20);
  const [restTime, setRestTime] = useState<number>(10);
  const [amrapMinutes, setAmrapMinutes] = useState<number>(20);
  const [emomRounds, setEmomRounds] = useState<number>(10);
  const [emomIntervalMinutes, setEmomIntervalMinutes] = useState<number>(1);
  const [emomIntervalSeconds, setEmomIntervalSeconds] = useState<number>(0);
  const [forTimeCapMinutes, setForTimeCapMinutes] = useState<number>(0);
  const [isTimerSet, setIsTimerSet] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);

  useEffect(() => {
    console.log(currentMode, rounds, workTime, restTime, amrapMinutes, emomRounds, emomIntervalMinutes, forTimeCapMinutes, isTimerSet, startTimer)
  }, [currentMode, rounds, workTime, restTime, amrapMinutes, emomRounds, emomIntervalMinutes, emomIntervalSeconds, forTimeCapMinutes, isTimerSet, startTimer]);

  return (
    <div>
      <button onClick={() => setCurrentMode(null)} className='fixed top-4 left-12 w-full flex items-center  cursor-pointer'>
        <ArrowLeftCircle size={48} />
        <p className='subtitle text-left'>{currentMode}</p>

      </button>
      {!isTimerSet && !startTimer && <SetTimerMenu currentMode={currentMode} rounds={rounds} setRounds={setRounds} workTime={workTime} setWorkTime={setWorkTime} restTime={restTime} setRestTime={setRestTime} amrapMinutes={amrapMinutes} setAmrapMinutes={setAmrapMinutes} emomRounds={emomRounds} setEmomRounds={setEmomRounds} emomIntervalMinutes={emomIntervalMinutes} setEmomIntervalMinutes={setEmomIntervalMinutes} emomIntervalSeconds={emomIntervalSeconds} setEmomIntervalSeconds={setEmomIntervalSeconds} forTimeCapMinutes={forTimeCapMinutes} setForTimeCapMinutes={setForTimeCapMinutes} setIsTimerSet={setIsTimerSet} />}
      {isTimerSet && <Countdown setStartTimer={setStartTimer} setIsTimerSet={setIsTimerSet} />}
      {startTimer && <Timer mode={currentMode} rounds={rounds} seconds={workTime} rest={restTime} amrapMinutes={amrapMinutes} emomRounds={emomRounds} emomIntervalMinutes={emomIntervalMinutes} emomIntervalSeconds={emomIntervalSeconds} forTimeCapMinutes={forTimeCapMinutes} />}
    </div>
  )
}

export default Tabata
