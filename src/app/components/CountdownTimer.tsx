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
      <div className="flex items-center space-x-1 font-normal text-sm">
        {[0, 0, 0, 0].map((_, i) => {
          return (
            <span
              key={i}
              className="flex h-7 w-7 justify-center items-center bg-[#1C1C1C] rounded-md"
            >
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

  const timeUnits = [
    { label: "days", value: timeLeft.days },
    { label: "hours", value: timeLeft.hours },
    { label: "minutes", value: timeLeft.minutes },
    { label: "seconds", value: timeLeft.seconds },
  ];

  const timerComponents = timeUnits.map(({ label, value }) => (
    <span
      key={label}
      className="flex h-7 w-7 justify-center items-center bg-[#1C1C1C] rounded-md"
    >
      {value.toString().padStart(2, "0")}
    </span>
  ));

  return (
    <div className="flex items-center space-x-1 font-normal text-sm">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-xl font-bold">Flash Sale is Over!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
