import { useEffect, useRef, useState } from "react";
import Button from "./Button";

const play321 = () => { new Audio('/sounds/321-robot.mp3').play().catch(() => {}); };
const playTimesUp = () => {
  const audio = new Audio('/sounds/timesup.mp3');
  let count = 0;
  const playNext = () => {
    if (count >= 4) return;
    count++;
    const instance = new Audio('/sounds/timesup.mp3');
    instance.play().catch(() => {});
    instance.onended = playNext;
  };
  audio.play().catch(() => {});
  audio.onended = playNext;
};

type TimerMode = "TABATA" | "AMRAP" | "EMOM" | "FOR TIME";

interface TimerProps {
  mode: TimerMode;
  seconds: number;
  rounds: number;
  rest: number;
  amrapMinutes: number;
  emomRounds: number;
  emomIntervalMinutes: number;
  emomIntervalSeconds: number;
  forTimeCapMinutes: number;
}

const formatTime = (valueInSeconds: number) => {
  const safeValue = Math.max(0, valueInSeconds);
  const minutes = Math.floor(safeValue / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (safeValue % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const Timer = ({ mode, seconds, rounds, rest, amrapMinutes, emomRounds, emomIntervalMinutes, emomIntervalSeconds, forTimeCapMinutes }: TimerProps) => {
  const totalEmomIntervalSecs = Math.max(1, emomIntervalMinutes * 60 + emomIntervalSeconds);
  const emomTotalRounds = Math.max(1, emomRounds);
  const amrapSeconds = amrapMinutes * 60;
  const forTimeCapSeconds = forTimeCapMinutes * 60;

  const getInitialRemaining = () => {
    if (mode === "TABATA") return seconds;
    if (mode === "AMRAP") return amrapSeconds;
    if (mode === "EMOM") return totalEmomIntervalSecs;
    return 0;
  };

  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [phase, setPhase] = useState<"WORK" | "REST">("WORK");
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [remainingTime, setRemainingTime] = useState<number>(getInitialRemaining());
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const endTimeRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const stopTimer = () => {
    playTimesUp();
    setIsRunning(false);
    setIsFinished(true);
    endTimeRef.current = null;
    startTimeRef.current = null;
  };

  const prev321Ref = useRef<boolean>(false);

  useEffect(() => {
    let timer: number;

    if (isRunning && !isFinished) {
      timer = window.setInterval(() => {
        const now = Date.now();

        if (mode === "FOR TIME") {
          if (startTimeRef.current === null) {
            startTimeRef.current = now - elapsedTime * 1000;
          }

          const timePassed = Math.max(0, Math.floor((now - startTimeRef.current) / 1000));
          setElapsedTime(timePassed);

          if (forTimeCapSeconds > 0 && timePassed >= forTimeCapSeconds) {
            setElapsedTime(forTimeCapSeconds);
            stopTimer();
          }

          return;
        }

        if (endTimeRef.current === null) {
          endTimeRef.current = now + remainingTime * 1000;
        }

        const timeLeft = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
        setRemainingTime(timeLeft);

        if (timeLeft === 3 && !prev321Ref.current) {
          play321();
          prev321Ref.current = true;
        } else if (timeLeft > 3) {
          prev321Ref.current = false;
        }

        if (timeLeft > 0) {
          return;
        }

        if (mode === "TABATA") {
          if (phase === "WORK") {
            if (currentRound >= rounds) {
              stopTimer();
              return;
            }

            if (rest > 0) {
              prev321Ref.current = false;
              setPhase("REST");
              setRemainingTime(rest);
              endTimeRef.current = now + rest * 1000;
            } else {
              const nextRound = currentRound + 1;
              setCurrentRound(nextRound);
              setRemainingTime(seconds);
              endTimeRef.current = now + seconds * 1000;
            }

            return;
          }

          prev321Ref.current = false;
          const nextRound = Math.min(rounds, currentRound + 1);
          setPhase("WORK");
          setCurrentRound(nextRound);
          setRemainingTime(seconds);
          endTimeRef.current = now + seconds * 1000;
          return;
        }

        if (mode === "AMRAP") {
          stopTimer();
          return;
        }

        if (mode === "EMOM") {
          if (currentRound >= emomTotalRounds) {
            stopTimer();
            return;
          }

          prev321Ref.current = false;
          const nextRound = currentRound + 1;
          setCurrentRound(nextRound);
          setRemainingTime(totalEmomIntervalSecs);
          endTimeRef.current = now + totalEmomIntervalSecs * 1000;
        }
      }, 250);
    }

    return () => clearInterval(timer);
  }, [isRunning, isFinished, mode, elapsedTime, remainingTime, phase, currentRound, rounds, seconds, rest, emomTotalRounds, totalEmomIntervalSecs, forTimeCapSeconds]);

  const startTimer = () => {
    if (!isFinished) {
      if (mode === "FOR TIME") {
        startTimeRef.current = Date.now() - elapsedTime * 1000;
      } else {
        endTimeRef.current = Date.now() + remainingTime * 1000;
      }
    }

    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsFinished(false);
    setIsRunning(false);
    setPhase("WORK");
    setCurrentRound(1);
    setRemainingTime(getInitialRemaining());
    setElapsedTime(0);
    endTimeRef.current = null;
    startTimeRef.current = null;
  };

  const restartTimer = () => {
    resetTimer();
    setTimeout(() => {
      setIsRunning(true);
    }, 0);
  };

  const timerLabel = () => {
    if (mode === "TABATA") {
      return `ROUND ${currentRound}/${rounds}`;
    }

    if (mode === "EMOM") {
      return `ROUND ${currentRound}/${emomTotalRounds} (${formatTime(totalEmomIntervalSecs)})`;
    }

    if (mode === "AMRAP") {
      return "AMRAP";
    }

    return forTimeCapSeconds > 0 ? `CAP ${formatTime(forTimeCapSeconds)}` : "FOR TIME";
  };

  const displayValue = mode === "FOR TIME" ? elapsedTime : remainingTime;
  const isRest = mode === "TABATA" && phase === "REST";

  return (
    <div className={`border w-screen h-screen flex flex-col items-center justify-center text-[30vw] lg:text-[15rem] font-bold`}>
      <h2>{formatTime(displayValue)}</h2>
      <h3 className="text-8xl">
        {timerLabel()}
      </h3>
      {isRest && <h3 className="text-6xl">REST</h3>}
      {isFinished && <h3 className="text-4xl">DONE</h3>}

      <div className="flex gap-4 mt-12">
        <Button onClick={() => (isRunning ? setIsRunning(false) : startTimer())} variant="primary">
          {isRunning ? "STOP" : "START"}
        </Button>
        <Button onClick={resetTimer} variant="primary">
          RESET
        </Button>
        {isFinished && <Button onClick={restartTimer}>AGAIN</Button>}
      </div>
    </div>
  );
};

export default Timer;