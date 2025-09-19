import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTargetDate = () => {
  return new Date("Jan 1, 2026 00:00:00");
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

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const isExpired =
    timeLeft !== null && Object.values(timeLeft).every((v) => v === 0);

  const updateTimer = () => {
    const targetDate = getTargetDate();
    const calculatedTime = calculateTimeLeft(targetDate);
    setTimeLeft(calculatedTime);
  };

  useEffect(() => {
    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "days", value: timeLeft?.days },
    { label: "hours", value: timeLeft?.hours },
    { label: "minutes", value: timeLeft?.minutes },
    { label: "seconds", value: timeLeft?.seconds },
  ];

  const timerComponents = timeUnits.map(({ label, value }) => (
    <span
      key={label}
      className="flex h-7 w-7 justify-center items-center bg-[#1C1C1C] rounded-md"
    >
      {value ? value.toString().padStart(2, "0") : "0"}
    </span>
  ));

  return (
    <div className="flex items-center space-x-1 font-normal text-sm">
      {isExpired ? (
        <span className="text-red-500 text-lg font-semibold">(Expired on January 1, 2026)</span>
      ) : (
        timerComponents
      )}
    </div>
  );
};

export default CountdownTimer;
