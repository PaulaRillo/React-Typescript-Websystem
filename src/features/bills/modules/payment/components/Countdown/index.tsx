import { useState, useEffect } from 'react';
//translate
import { tr } from 'shared/translate';

type Props = {
    seconds: string;
    countdownKey: number;
  };

function Countdown({ seconds, countdownKey }: Props) {
  const [timeLeft, setTimeLeft] = useState(Number(seconds));

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  useEffect(() => {
    setTimeLeft(Number(seconds));
  }, [seconds, countdownKey]);

  const countdownString = `${minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft} ${tr('shared.minutes')}.`;

  return countdownString;
}

export default Countdown;