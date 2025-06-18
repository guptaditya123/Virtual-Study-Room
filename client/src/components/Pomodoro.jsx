import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Pomodoro = ({ socket, roomId }) => {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const intervalRef = useRef(null);

  const timerModes = {
    work: { time: 1500, color: "bg-red-500", label: "Focus Time" },
    shortBreak: { time: 300, color: "bg-green-500", label: "Short Break" },
    longBreak: { time: 900, color: "bg-blue-500", label: "Long Break" },
  };

  const setTimerMode = (mode) => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(timerModes[mode].time);
    setIsBreak(mode !== "work");
    socket?.emit("sync_timer", { roomId, time: timerModes[mode].time });
    socket?.emit("sync_timer_state", { roomId, isRunning: false });
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const updated = prev - 1;
          socket?.emit("sync_timer", { roomId, time: updated });
          return updated;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setShowNotification(true);
      if (!isBreak) setCompletedSessions((prev) => prev + 1);
      setTimeout(() => {
        setShowNotification(false);
        if (isBreak) setTimerMode("work");
        else
          setTimerMode(
            (completedSessions + 1) % 4 === 0 ? "longBreak" : "shortBreak"
          );
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning((prev) => {
      socket?.emit("sync_timer_state", { roomId, isRunning: !prev });
      return !prev;
    });
  };

  const resetTimer = () => {
    setIsRunning(false);
    const resetTime = isBreak
      ? (completedSessions + 1) % 4 === 0
        ? timerModes.longBreak.time
        : timerModes.shortBreak.time
      : timerModes.work.time;
    setTimeLeft(resetTime);
    socket?.emit("sync_timer", { roomId, time: resetTime });
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${s % 60 < 10 ? "0" : ""}${s % 60}`;

  const currentMode = isBreak
    ? (completedSessions + 1) % 4 === 0
      ? "longBreak"
      : "shortBreak"
    : "work";

  return (
   <div className="flex items-start justify-center bg-gray-900 px-4 py-6 flex-wrap gap-4">
  {/* Mode Buttons */}
  <div className="flex  gap-2">
    {["work", "shortBreak", "longBreak"].map((mode) => (
      <button
        key={mode}
        onClick={() => setTimerMode(mode)}
        className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition ${
          timerModes[mode].color
        } ${currentMode === mode ? "ring-2 ring-white" : "opacity-60 hover:opacity-90"}`}
      >
        {timerModes[mode].label}
        <div className="text-[10px]">{timerModes[mode].time / 60} min</div>
      </button>
    ))}
  </div>

  {/* Timer Card */}
  <div className="w-full sm:w-80 bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-4">
    <h2 className="text-base font-semibold text-white mb-3 flex items-center">
      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse" />
      {timerModes[currentMode].label}
    </h2>

    <div className="text-center mb-4">
      <div className="text-4xl font-bold text-white font-mono">
        {formatTime(timeLeft)}
      </div>
      <p className="text-xs text-gray-400 mt-1">
        {isBreak ? "Time to relax!" : `Session ${completedSessions + 1}`}
      </p>
    </div>

    {/* Controls */}
    <div className="flex justify-center gap-2 mb-4">
      <button
        onClick={toggleTimer}
        className={`px-3 py-1.5 rounded-md text-sm font-medium text-white ${
          isRunning ? "bg-gray-600" : "bg-indigo-600"
        } hover:opacity-90`}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        onClick={resetTimer}
        className="px-3 py-1.5 bg-gray-600 rounded-md text-sm text-white font-medium hover:opacity-90"
      >
        Reset
      </button>
    </div>

    {/* Progress Bar */}
    <div className="w-full h-1.5 bg-white bg-opacity-20 rounded overflow-hidden">
      <motion.div
        className={`h-full ${isBreak ? "bg-green-400" : "bg-red-400"}`}
        initial={{ width: "0%" }}
        animate={{
          width: `${(1 - timeLeft / timerModes[currentMode].time) * 100}%`,
        }}
        transition={{ duration: 1 }}
      />
    </div>
  </div>

  {/* Notification */}
  <AnimatePresence>
    {showNotification && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-4 py-2 rounded-full shadow-xl text-sm font-medium"
      >
        {isBreak ? "Break is over! Back to focus!" : "Time for a break! 🎉"}
      </motion.div>
    )}
  </AnimatePresence>
</div>

  );
};

export default Pomodoro;
