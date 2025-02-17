import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )},${String(milliseconds).padStart(2, "0")}`;
  };

  return (
      <div className="bg-gray-700 w-screen h-screen mx-auto flex flex-col justify-center">
        <div className="flex justify-center p-4">
          <h1 className="text-7xl text-white font-mono">{formatTime(time)}</h1>
        </div>
        <div className="flex justify-center space-x-10 mt-4">
          <button
            className="bg-gray-900 text-white w-20 h-20 p-4 rounded-full"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className={`text-white w-20 h-20 p-4 rounded-full bg-opacity-70 ${
              isActive ? "bg-red-500" : "bg-green-600"
            }`}
            onClick={isActive ? handleStop : handleStart}
          >
            {isActive ? "Stop" : "Start"}
          </button>
        </div>
        <div className="absolute bottom-0 w-full text-center text-white p-2">
          <p>Made with ❤️ by <a href="https://github.com/vuzzer" target="blank" className="text-blue-300">Bienvenu Kouassi</a>  &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
  );
}

export default App;
