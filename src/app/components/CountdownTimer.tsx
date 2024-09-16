// components/CountdownTimer.tsx
import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const getTargetDate = () => {
    return new Date("Jan 1, 2025 00:00:00");
  };

  const calculateTimeLeft = (targetDate: Date) => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTimer = () => {
      const targetDate = getTargetDate();
      setTimeLeft(calculateTimeLeft(targetDate));
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2 font-normal text-sm">
        {[0, 0, 0, 0].map((_, i) => {
          return (
            <span key={i} className="flex h-7 w-7 justify-center items-center bg-[#1C1C1C] rounded-md">
              0
            </span>
          );
        })}
      </div>
    ); // Render nothing until mounted
  }

  if (timeLeft === null) {
    return null; // Render nothing until timeLeft is set
  }

  const timerComponents = [
    <span
      key="days"
      className="flex h-7 w-7 justify-center items-center bg-[#1C1C1C] rounded-md"
    >
      {timeLeft.days.toString().padStart(2, "0")}
    </span>,
    <span
      key="hours"
      className="flex h-7 w-7 justify-center items-center bg-[#1C1C1C] rounded-md"
    >
      {timeLeft.hours.toString().padStart(2, "0")}
    </span>,
    <span
      key="minutes"
      className="flex h-7 w-7 justify-center items-center bg-[#1C1C1C] rounded-md"
    >
      {timeLeft.minutes.toString().padStart(2, "0")}
    </span>,
    <span
      key="seconds"
      className="flex h-7 w-7 justify-center items-center bg-[#1C1C1C] rounded-md"
    >
      {timeLeft.seconds.toString().padStart(2, "0")}
    </span>,
  ];

  return (
    <div className="flex items-center space-x-2 font-normal text-sm">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-xl font-bold">Flash Sale is Over!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
