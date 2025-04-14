import React, { useEffect, useState } from "react";

 function Timer({ setTimeUp }) {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setTimeUp(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-left mb-10 text-xl text-gray-900">
      Time Remaining: {seconds} seconds
    </div>
  );
}
export default Timer;